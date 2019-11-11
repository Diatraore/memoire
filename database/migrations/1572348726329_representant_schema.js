'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RepresentantSchema extends Schema {
  up () {
    this.create('representants', (table) => {
      table.increments()
      table.string('nom',50).notNullable().unique()
      table.integer('tel')
      table.string('mail',80).notNullable().unique()
      table.string('adr',80).notNullable().unique()
      table.string('fonction',30).notNullable()
      table.integer('client_id').unsigned().references('id').inTable('clients')
      table.timestamps()
    })
  }

  down () {
    this.drop('representants')
  }
}

module.exports = RepresentantSchema
