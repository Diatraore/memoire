'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');


Route.on('/hello').render('welcome').middleware('auth');

Route.get('/', 'DasboardController.index').as('index.list').middleware('auth');
Route.get('/login','UserController.connection')
Route.post('/login', 'UserController.login')
Route.get('/logout', 'UserController.logout').as('logout.active')


Route.get('/categories', 'CategorieController.index').as('categories.list').middleware('auth')
Route.get('/categorie/new', 'CategorieController.create').as('categorie.create').middleware('auth')
Route.post('/categorie', 'CategorieController.store').middleware('auth')
Route.get('/categorie/:id/edit', 'CategorieController.edit').as('categorie.edit').middleware('auth').middleware('auth')
Route.put('/categorie/:id', 'CategorieController.update').middleware('auth')
Route.get('/categorie/:id/delete', 'CategorieController.delete').middleware('auth')

Route.get('/produits', 'ProduitController.index').as('produits.list').middleware('auth')
Route.get('/produit/new', 'ProduitController.create').as('produit.create').middleware('auth')
Route.post('/produit', 'ProduitController.store').middleware('auth')
Route.get('/produit/:id/edit', 'ProduitController.edit').as('produit.edit').middleware('auth')
Route.put('/produit/:id', 'ProduitController.update').middleware('auth')
Route.get('/produit/:id/delete', 'ProduitController.delete').middleware('auth')

Route.get('/statut_clients', 'StatutClientController.index').as('statut_clients.list').middleware('auth')
Route.get('/statut_client/new', 'StatutClientController.create').as('statut_client.create').middleware('auth')
Route.post('/statut_client', 'StatutClientController.store').middleware('auth')
Route.get('/statut_client/:id/edit', 'StatutClientController.edit').as('statut_clients.edit').middleware('auth')
Route.put('/statut_client/:id', 'StatutClientController.update').middleware('auth')
Route.get('/statut_client/:id/delete', 'StatutClientController.delete').middleware('auth')


Route.get('/clients', 'ClientController.index').as('clients.list').middleware('auth')
Route.get('/client/new', 'ClientController.create').as('client.create').middleware('auth')
Route.post('/client', 'ClientController.store').middleware('auth')
Route.get('/client/:id/edit', 'ClientController.edit').as('client.edit').middleware('auth')
Route.put('/client/:id', 'ClientController.update').middleware('auth')
Route.get('/client/:id/delete', 'ClientController.delete').middleware('auth')
Route.get('/representant/:id/delete', 'RepresentantController.delete').middleware('auth')
Route.get('/representant/:id/edit', 'RepresentantController.edit').as('representant.edit').middleware('auth')
 Route.put('/representant/:id', 'RepresentantController.update').middleware('auth')
 Route.get('/representants', 'ClientController.index').as('clients.list').middleware('auth')
// Route.get('/representant/new', 'RepresentantController.create').as('representant.create')
Route.post('/representant', 'RepresentantController.createRepresentant').middleware('auth')
//"" Route.get('/representant/:id/edit', 'RepresentantController.edit').as('representant.edit')
// Route.put('/representant/:id', 'RepresentantController.update')
// Route.get('/representant/:id/delete', 'RepresentantController.delete')

// Route.get('/rendez_vous', 'RendezVousController.index').as('rendez_vous.list')
// Route.get('/rdv/new', 'ClientController.create').as('rendezvous.create')
// Route.post('/rendezvous', 'ClientController.store')
// Route.get('/rdv/:id/edit', 'ClientController.edit').as('rendezvous.edit')
// Route.put('/rdv/:id', 'ClientController.update')
// Route.get('/rdv/:id/delete', 'ClientController.delete')

Route.get('/rendez-vous', 'RendezVousController.index').as('rendez_vous.list').middleware('auth')
Route.get('/rendez_vous/new', 'RendezVousController.create').as('rendez_vous.create').middleware('auth')
Route.post('/rdv', 'RendezVousController.store').as('rdv.insert').middleware('auth')
Route.get('/rdv/:id/edit', 'RendezVousController.edit').as('rendez_vous.edit').middleware('auth')
Route.put('/rdv/:id', 'RendezVousController.update').middleware('auth')
Route.get('/rdv/:id/delete', 'RendezVousController.delete').middleware('auth')

Route.get('/users', 'UserController.index').as('users.list').middleware('auth')
Route.get('/utlisateur/new', 'UserController.create').as('utilisateur.create').middleware('auth')
Route.post('/utilisateur', 'UserController.store').middleware('auth')
Route.get('/utilisateur/:id/edit', 'UserController.edit').as('utilisateur.edit').middleware('auth')
Route.put('/utilisateur/:id', 'UserController.update').middleware('auth')
Route.get('/utilisateur/:id/delete', 'UserController.delete').middleware('auth')
