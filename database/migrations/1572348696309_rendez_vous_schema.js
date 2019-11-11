'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RendezVousSchema extends Schema {
  up () {
    this.create('rendez_vous', (table) => {
      table.increments()
      table.datetime('date_heure', { precision:6})
      table.string('lieu',80).notNullable()
      table.integer('client_id').unsigned().references('id').inTable('clients')
      table.timestamps()
    })
  }

  down () {
    this.drop('rendez_vous')
  }
}

module.exports = RendezVousSchema
