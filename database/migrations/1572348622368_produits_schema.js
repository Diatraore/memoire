'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProduitsSchema extends Schema {
  up () {
    this.create('produits', (table) => {
      table.increments()
      table.string('nom',50).notNullable().unique()
      table.text('desc','mediumtext').nullable()
      table.integer('prix')
      table.integer('categorie_id').unsigned().references('id').inTable('categories')
      table.timestamps()
    })
  }

  down () {
    this.drop('produits')
  }
}

module.exports = ProduitsSchema
