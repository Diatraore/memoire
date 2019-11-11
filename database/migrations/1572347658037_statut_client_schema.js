'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class StatutClientSchema extends Schema {
  up () {
    this.create('statut_clients', (table) => {
      table.increments()
      table.string('nom',50).notNullable().unique()
      table.timestamps()
    })
  }

  down () {
    this.drop('statut_clients')
  }
}

module.exports = StatutClientSchema
