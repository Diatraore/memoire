
'use strict'
const Database = use('Database')
const { validateAll } = use('Validator')

class ClientController {
    async index ({view }){
       
      const clients = await Database
      .select('clients.id', 'clients.nom','clients.tel', 'clients.mail', 'clients.adr','clients.web', 'statut_clients.nom as statut')
      .from('clients')
      .leftJoin('statut_clients', 'statut_clients.id', 'clients.statut_id')
     // return clients
  return view.render('client.index', { clients: clients})
}

  async create({view}) {
    const statuts = await Database.table('statut_clients').select('*')
    return view.render('client.create', {statuts: statuts})
  }

 async store({ session, request, response, view}) {

  const data = request.all()
  const validation = await validateAll(data, {
      nom: 'required',
    
    })

    if(validation.fails()) {
      session
      .withErrors(validation.messages())
      .flashAll()
      return response.redirect('/client/new')
    }
 
     const id = await Database.table('clients').insert({nom: data.nom, tel: data.tel, mail: data.mail, adr: data.adresse, web: data.web, statut_id: data.statut_client})
     const client = await Database.from('clients').where('id',id[0] )
     const statut_clients = await Database.table('statut_clients').select('*')
     session.flash({ notification: 'le client a été enregistré!' })
     return view.render('client.edit', {client: client, statut_clients: statut_clients})
     
  }

  async edit({ view,params }){
      const client = await Database.from('clients').where('id',params.id )
      const statut_clients = await Database.table('statut_clients').select('*')
      let representants = await Database.from('representants').where('client_id', params.id)
      //return representants 
     return view.render('client.edit', { client: client, statut_clients: statut_clients, representants: representants})
  }

  async update({ request, params, response, session }){
     // const data = request.only(['nom'])
     const data = request.all()
      const validation = await validateAll(data, {
          nom: 'required',
         
        })

        if(validation.fails()) {
          session
          .withErrors(validation.messages())
          .flashAll()
          return response.redirect('back')
        }
          console.log(data)
          console.log(params)
          
       await Database.table('clients').where('id',data.id ).update({ nom: data.nom, tel: data.telephone, mail: data.mail, adr: data.adresse_localisation, web: data.site_web, statut_id: data.statut_client  })
       session.flash({ notification: 'les coordonnées du client ont été!' })
        return response.redirect('/clients')
  }
async delete({ params, response }){
   await Database.table('clients').where('id',params.id ).delete()
   return response.redirect('/clients')
}
}

module.exports = ClientController
