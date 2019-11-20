'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ClientsSchema extends Schema {
  up () {
    this.create('clients', (table) => {
      table.increments()
      table.string('nom',50).notNullable()
      table.integer('tel').unique()
      table.string('mail',80).notNullable().unique()
      table.string('adr',80).notNullable()
      table.string('web',30).nullable()
      table.integer('statut_id').unsigned().references('id').inTable('statut_clients')
      table.timestamps()
    })
  }

  down () {
    this.drop('clients')
  }
}

module.exports = ClientsSchema
