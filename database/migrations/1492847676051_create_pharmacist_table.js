'use strict'

const Schema = use('Schema')

class PharmacistTableSchema extends Schema {

  up () {
    this.create('pharmacists', (table) => {
      table.increments()
      table.timestamps()
      table.integer('userID').unsigned().index().references('id').inTable('employees')
    })
  }

  down () {
    this.dropIfExists('pharmacists')
  }

}

module.exports = PharmacistTableSchema
