'use strict'
const Database = use('Database')
const { validateAll } = use('Validator')
class UserController {
    async index ({view }){
    const users = await Database.table('users').select('*')
      
    return view.render('utilisateur.index', { users: users})
}

async login ({ request, auth, response }) {
    try {
        // validate the user credentials and generate a JWT token
        const token = await auth.attempt(
            request.input('email'),
            request.input('password')
        )

        return response.json({
            status: 'success',
            data: token
        })
    } catch (error) {
        response.status(400).json({
            status: 'error',
            message: 'Invalid email/password'
        })
    }
}

create({view}) {

    return view.render('utilisateur.create')
}

async store({ session, request, response}) {

const data = request.all()
const validation = await validateAll(data, {
    nom: 'required',
   
  })

  if(validation.fails()) {
      console.log("fakeland")
    session
    .withErrors(validation.messages())
    .flashAll()
    return response.redirect('/utilisateur/new')
  }

  await Database.table('users').insert({username: data.nom, email: data.mail, tel: data.tel, fonction: data.fonction, password: data.mdp, role: 2})
  session.flash({ notification: "L'utlisateur a été bien supprimé!" })
  return response.redirect('/users')
}

async edit({ view,params }){
    const utilisateur = await Database.from('users').where('id',params.id )
   // return view.render('categorie.edit', JSON.stringify(categorie))
   return view.render('utilisateur.edit', { utilisateur: utilisateur})
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
        
     await Database.table('users').where('id',data.id ).update({ username: data.nom, email: data.mail, tel: data.tel, fonction: data.fonction, password: data.mdp, role: 2 })
     session.flash({ notification: "l'utilisateur a été bien modifié!" })
      return response.redirect('/users')
}
async delete({ params, response }){
 await Database.table('users').where('id',params.id ).delete()
 return response.redirect('/users')
}
}

module.exports = UserController
