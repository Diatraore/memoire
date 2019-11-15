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
const Route = use('Route')


Route.on('/hello').render('welcome')


Route.get('/categories', 'CategorieController.index').as('categories.list')
Route.get('/categorie/new', 'CategorieController.create').as('categorie.create')
Route.post('/categorie', 'CategorieController.store')
Route.get('/categorie/:id/edit', 'CategorieController.edit').as('categorie.edit')
Route.put('/categorie/:id', 'CategorieController.update')
Route.get('/categorie/:id/delete', 'CategorieController.delete')

Route.get('/produits', 'ProduitController.index').as('produits.list')
Route.get('/produit/new', 'ProduitController.create').as('produit.create')
Route.post('/produit', 'ProduitController.store')
Route.get('/produit/:id/edit', 'ProduitController.edit').as('produit.edit')
Route.put('/produit/:id', 'ProduitController.update')
Route.get('/produit/:id/delete', 'ProduitController.delete')

Route.get('/statut_clients', 'StatutClientController.index').as('statut_clients.list')
Route.get('/statut_client/new', 'StatutClientController.create').as('statut_client.create')
Route.post('/statut_client', 'StatutClientController.store')
Route.get('/statut_client/:id/edit', 'StatutClientController.edit').as('statut_clients.edit')
Route.put('/statut_client/:id', 'StatutClientController.update')
Route.get('/statut_client/:id/delete', 'StatutClientController.delete')


Route.get('/clients', 'ClientController.index').as('clients.list')
Route.get('/client/new', 'ClientController.create').as('client.create')
Route.post('/client', 'ClientController.store')
Route.get('/client/:id/edit', 'ClientController.edit').as('client.edit')
Route.put('/client/:id', 'ClientController.update')
Route.get('/client/:id/delete', 'ClientController.delete')
Route.get('/representant/:id/delete', 'RepresentantController.delete')
Route.get('/representant/:id/edit', 'RepresentantController.edit').as('representant.edit')
 Route.put('/representant/:id', 'RepresentantController.update')
 Route.get('/representants', 'ClientController.index').as('clients.list')
// Route.get('/representant/new', 'RepresentantController.create').as('representant.create')
Route.post('/representant', 'RepresentantController.createRepresentant')
//"" Route.get('/representant/:id/edit', 'RepresentantController.edit').as('representant.edit')
// Route.put('/representant/:id', 'RepresentantController.update')
// Route.get('/representant/:id/delete', 'RepresentantController.delete')

// Route.get('/rendez_vous', 'RendezVousController.index').as('rendez_vous.list')
// Route.get('/rdv/new', 'ClientController.create').as('rendezvous.create')
// Route.post('/rendezvous', 'ClientController.store')
// Route.get('/rdv/:id/edit', 'ClientController.edit').as('rendezvous.edit')
// Route.put('/rdv/:id', 'ClientController.update')
// Route.get('/rdv/:id/delete', 'ClientController.delete')

Route.get('/rendez-vous', 'RendezVousController.index').as('rendez_vous.list')
Route.get('/rendez_vous/new', 'RendezVousController.create').as('rendez_vous.create')
Route.post('/rdv', 'RendezVousController.store').as('rdv.insert');
Route.get('/rdv/:id/edit', 'RendezVousController.edit').as('rendez_vous.edit')
Route.put('/rdv/:id', 'RendezVousController.update')
Route.get('/rdv/:id/delete', 'RendezVousController.delete')
