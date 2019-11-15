'use strict'
const Database = use('Database')
const { validateAll } = use('Validator')

class DasboardController {

    async index({view}){
        const cate = await Database.count('* as total').table('categories');
        const clients = await Database.count('* as total').table('clients');
        const produits = await Database.count('* as total').table('produits');
        const rendez_vous = await Database.count('* as total').table('rendez_vous');
        const representants = await Database.count('* as total').table('representants');
        const statut_clients = await Database.count('* as total').table('statut_clients');
        return view.render('dasboard.index', {cate:cate[0].total, clients:clients[0].total,produits:produits[0].total,rendez:rendez_vous[0].total,representants:representants[0].total,statut_clients:statut_clients[0].total} )
    }
}



module.exports = DasboardController
