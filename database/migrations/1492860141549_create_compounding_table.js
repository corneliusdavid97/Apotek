'use strict'

const Schema = use('Schema')

class CompoundingsTableSchema extends Schema {

  up () {
    this.create('compoundings', (table) => {
      table.increments()
      table.timestamps()
      table.integer('compMedID').unsigned().index().references('id').inTable('compounded_medicines')
      table.integer('basicMedID').unsigned().index().references('id').inTable('basic_medicines')
      table.integer('quantity')
      table.integer('subtotal')
    })
  }

  down () {
    this.dropIfExists('compoundings')
  }

}

module.exports = CompoundingsTableSchema
