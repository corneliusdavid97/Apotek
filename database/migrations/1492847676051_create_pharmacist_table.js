'use strict'

const Schema = use('Schema')

class PharmacistTableSchema extends Schema {

  up () {
    this.create('pharmacists', (table) => {
      table.increments()
      table.timestamps()
      table.integer('userID').unsigned().index().references('id').inTable('employees')
      // table.foreign('username').reference('employees.username')
      table.string('name')
      table.string('TelpNo').unique()
    })
  }

  down () {
    this.dropIfExists('pharmacists')
  }

}

module.exports = PharmacistTableSchema
