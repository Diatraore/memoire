'use strict'
const Database = use('Database')
const { validateAll } = use('Validator')
const Hash = use('Hash')
const User = use('App/Models/User')

const Encryption = use('Encryption')


class UserController {
    async index ({view,auth }){
    const users = await Database.table('users').select('*')
      
    return view.render('utilisateur.index', { users: users, me:auth.user})
}

async logout({response, auth}){
    await auth.logout();
    return response.redirect('/login')
}

async login ({ auth, request, response, session }) {
    const { email, password } = request.all()

    try {
        const encrypted = Encryption.encrypt(password)
        let requestHeaders = request.headers()

      const nadia = await auth.attempt(email, password)
    } catch (e) {
        console.log(e)

        return response.redirect('login')
    }

    return response.redirect('/')
}

create({view,auth}) {

    return view.render('utilisateur.create',{me:auth.user})
}

connection({view,auth}){
    return view.render('dasboard.login',{me:auth.user})
}

async store({ session, auth, request, response}) {

const data = request.all()
const validation = await validateAll(data, {
    username: 'required',
   
  })

  if(validation.fails()) {
      console.log("fakeland")
    session
    .withErrors(validation.messages())
    .flashAll()
    return response.redirect('/utilisateur/new')
  }

  const user = await User.create({username:data.username,email: data.email,password:data.password,  tel:data.tel, fonction:data.fonction,role:parseInt(data.role,10)})
  session.flash({ notification: "l'utilisateur enregistré!" })
  /*await Database.table('users').insert({username: data.nom, email: data.mail, tel: data.tel, fonction: data.fonction, password: data.mdp, role: 2})
  session.flash({ notification: "L'utlisateur a été bien supprimé!" })*/
  return response.redirect('/users')
}

async edit({ view,params,auth }){
    const utilisateur = await Database.from('users').where('id',params.id )
   // return view.render('categorie.edit', JSON.stringify(categorie))
   return view.render('utilisateur.edit', { utilisateur: utilisateur, me:auth.user})
}

async update({ request, params, response, session }){
   // const data = request.only(['nom'])
   const data = request.all()
    const validation = await validateAll(data, {
        username: 'required',
       
      })

      if(validation.fails()) {
        session
        .withErrors(validation.messages())
        .flashAll()
        return response.redirect('back')
      }
        console.log(data)
        console.log(params)
        
     await Database.table('users').where('id',data.id ).update({ username: data.nom, email: data.mail, tel: data.tel, fonction: data.fonction, password: data.mdp, role:parseInt(data.role,10)})
     session.flash({ notification: "l'utilisateur a été bien modifié!" })
      return response.redirect('/users')
}
async delete({ params, response }){
 await Database.table('users').where('id',params.id ).delete()
 return response.redirect('/users')
}
}

module.exports = UserController
