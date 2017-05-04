'use strict'

const Schema = use('Schema')

class CashiersTableSchema extends Schema {

  up () {
    this.create('cashiers', (table) => {
      table.increments()
      table.timestamps()
      table.integer('userID').unsigned().index().references('id').inTable('employees')
    })
  }

  down () {
    this.dropIfExists('cashiers')
  }

}

module.exports = CashiersTableSchema
