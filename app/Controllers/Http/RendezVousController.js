'use strict'
const Database = use('Database')
const { validateAll } = use('Validator')

class RendezVousController {
    async index ({view }){
      let rendez_vous = await Database
      .select('rendez_vous.id', 'rendez_vous.date_heure','rendez_vous.lieu', 'clients.nom as client')
      .from('rendez_vous')
      .leftJoin('clients', 'clients.id', 'rendez_vous.client_id');

      for(let i in rendez_vous){
        console.log(new Date(rendez_vous[i].date_heure).toLocaleString("fr-FR", { hour12: false }));
        rendez_vous[i].nadiaDate = new Date(rendez_vous[i].date_heure).toLocaleString("fr-FR", { hour12: false });
      }
     // return rendez_vous
  return view.render('rendez_vous.index', { rendez_vous: rendez_vous})
}

  async create({view}) {
    const clients = await Database.table('clients').select('*')
    return view.render('rendez_vous.create', {clients: clients})
  }

 async store({ session, request, response}) {

  const data = request.all()
  const validation = await validateAll(data, {
    date_heure: 'required',
     
    })

     if(validation.fails()) {
      session
       .withErrors(validation.messages())
      .flashAll()
       return response.redirect('/rendez_vous/new')
     } 
     
    const rdv = await Database.table('rendez_vous').insert({ date_heure: data.date_heure, lieu: data.lieu,
       client_id: data.client})
       //console.log(rdv)
       session.flash({ notification: 'Rendez vous enregistré!' })
     return response.route('rendez_vous.list')
  
  }

async edit({ view,params }){
      const rendez_vous = await Database.from('rendez_vous').where('id',params.id )
      const clients = await Database.from('clients')
     // return view.render('categorie.edit', JSON.stringify(categorie))
     rendez_vous[0].nadiaDate = new Date(rendez_vous[0].date_heure).toLocaleString("fr-FR");
     return view.render('rendez_vous.edit', { rendez_vous: rendez_vous[0], clients: clients})
  }

  async update({ request, params, response, session }){
     // const data = request.only(['nom'])
     const data = request.all()
       await Database.table('rendez_vous').where('id',data.id ).update({date_heure: data.date_heure, lieu: data.lieu, client_id: data.client })
       session.flash({ notification: 'Rendez vous modifié!' })
        return response.redirect('/rendez-vous')
  }
async delete({ params, response }){
   await Database.table('rendez_vous').where('id',params.id ).delete()
   return response.redirect('/rendez-vous')
}  
    }

module.exports = RendezVousController
