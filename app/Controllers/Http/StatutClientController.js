'use strict'

const Database = use('Database')
const { validateAll } = use('Validator')
class StatutClientController {
    async index ({view, auth }){
       
        const statut_clients = await Database.table('statut_clients').select('*')
       
         return view.render('statut_client.index', { statut_clients: statut_clients, me:auth.user})
     }
 
    async  create({view, auth}) {
         return view.render('statut_client.create',{me:auth.user})
     }
 
    async store({ session, request, response}) {
 
     const data = request.only(['nom'])
     const validation = await validateAll(data, {
         nom: 'required',
        
       })
 
       if(validation.fails()) {
         session
         .withErrors(validation.messages())
         .flashAll()
         return response.redirect('/statut_client/new')
       }
 
       await Database.table('statut_clients').insert({nom: data.nom})
       session.flash({ notification: 'statut client enregistré!' })
       return response.redirect('/statut_clients')
     }
 
     async edit({ view,params,auth }){
         const statut_client = await Database.from('statut_clients').where('id',params.id )
        // return view.render('categorie.edit', JSON.stringify(categorie))
        return view.render('statut_client.edit', { statut_client: statut_client,me:auth.user})
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
             
          await Database.table('statut_clients').where('id',data.id ).update({ nom: data.nom  })
          session.flash({ notification: 'statut client modifié!' })
           return response.redirect('/statut_clients')
     }
 async delete({ params, response }){
      await Database.table('statut_clients').where('id',params.id ).delete()
      return response.redirect('/statut_clients')
 }
 
 
}

module.exports = StatutClientController
