'use strict'
const Database = use('Database')
const { validateAll } = use('Validator')

class RepresentantController {

  async index ({view }){
      
    const representants = await Database
      .select('representants.id', 'representants.nom','representants.tel', 'representants.mail','representants.adr ','representants.fonction', 'clients.nom as client')
      .from('representants')
      .leftJoin('clients', 'clients.id', 'representants.client_id')
      
  return view.render('representant.index', { representants: representants})
 }

async create({view}) {
    const clients = await Database.table('clients').select('*')
     return view.render('representant.create', {clients: clients})
 }

async store({ session, request, response}) {

 const data = request.all()
 const validation = await validateAll(data, {
     nom: 'required', 
    
   })

   if(validation.fails()) {
     session
     .withErrors(validation.messages())
     .flashAll()
     return response.redirect('/representant/new')  
   }
   // console.log(data)
   const rep = await Database.table('representants')
                .insert({nom: data.nom, tel: data.tel, mail: data.mail, adr: data.adr,
                   fonction: data.fonction, client_id: data.client })
                   session.flash({ notification: 'Representant enregistré!' })
                  return response.json(rep)
   //return response.redirect('/representants')
 }

 async createRepresentant({request, response}){
   let data = request.all();
   let focus = await Database.table("representants").insert({nom: data.nom, tel: data.telephone, mail: data.mail, adr: data.adr, fonction: data.fonction, client_id: parseInt(data.client,10)})
   return response.redirect(`/client/${data.client}/edit`);
  }

 async edit({ view,params }){
     const representant = await Database.from('representants').where('id',params.id )
     const clients = await Database.table('clients').select('*')
    // return view.render('categorie.edit', JSON.stringify(categorie))
    return view.render('representant.edit', { representant: representant, clients:clients})
 }

 async update({ request, response, session }){
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
        // console.log(data)
         
      await Database.table('representants').where('id',data.id ).update({ nom: data.nom, tel: data.tel, mail: data.mail, adr: data.adr, fonction: data.fonction})
       const client = await Database.table('representants').where('id',data.id );
       
       return response.redirect(`/client/${client[0].client_id}/edit`)
 }
async delete({ params, response }){
  await Database.table('representants').where('id',params.id ).delete()
  return response.redirect('/representants')
}
  }


module.exports = RepresentantController