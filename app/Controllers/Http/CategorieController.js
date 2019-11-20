
'use strict'

const Database = use('Database')
const { validateAll } = use('Validator')

class CategorieController {
    async index ({view,auth }){
       
       const categories = await Database.table('categories').select('*')
      
        return view.render('categorie.index', { categories: categories, me:auth.user})
    }

    create({view,auth}) {

        return view.render('categorie.create',{ me:auth.user})
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
        return response.redirect('/categorie/new')
      }

      await Database.table('categories').insert({nom: data.nom})
      session.flash({ notification: 'La catégorie a été renseignée!' })
      return response.redirect('/categories')
    }

    async edit({ view,params,auth }){
        const categorie = await Database.from('categories').where('id',params.id )
       // return view.render('categorie.edit', JSON.stringify(categorie))
       return view.render('categorie.edit', { categorie: categorie, me:auth.use})
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
            
         await Database.table('categories').where('id',data.id ).update({ nom: data.nom  })
         session.flash({ notification: 'La catégorie a été modifié!' })
          return response.redirect('/categories')
    }
async delete({ params, response }){
     await Database.table('categories').where('id',params.id ).delete()
     return response.redirect('/categories')
}
}

module.exports = CategorieController
