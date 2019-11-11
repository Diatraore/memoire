'use strict'

const Database = use('Database')
const { validateAll } = use('Validator')

class ProduitController {
    async index ({view }){
       
        const produits = await Database
            .select('produits.id', 'produits.nom','produits.desc', 'produits.prix', 'categories.nom as categorie')
            .from('produits')
            .leftJoin('categories', 'categories.id', 'produits.categorie_id')
      
        return view.render('produit.index', { produits: produits})
     }
 
    async create({view}) {
        const categories = await Database.table('categories').select('*')
         return view.render('produit.create', {categories: categories})
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
         return response.redirect('/produit/new')  
       }
       // console.log(data)
       await Database.table('produits')
                    .insert({nom: data.nom,desc: data.description, prix: data.prix, categorie_id: data.categorie })
       return response.redirect('/produits')
     }
 
     async edit({ view,params }){
         const produit = await Database.from('produits').where('id',params.id )
         const categories = await Database.table('categories').select('*')
        // return view.render('categorie.edit', JSON.stringify(categorie))
        return view.render('produit.edit', { produit: produit, categories:categories})
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
            // console.log(data)
             
          await Database.table('produits').where('id',data.id ).update({ nom: data.nom,desc: data.description, prix: data.prix, categorie_id: data.categorie })
           
           return response.redirect('/produits')
     }
 async delete({ params, response }){
      await Database.table('produits').where('id',params.id ).delete()
      return response.redirect('/produits')
 }
}

module.exports = ProduitController
