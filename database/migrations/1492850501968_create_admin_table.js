'use strict'

const Schema = use('Schema')

class AdminsTableSchema extends Schema {

  up () {
    this.create('admins', (table) => {
      table.increments()
      table.timestamps()
      table.integer('userID').unsigned().index().references('id').inTable('employees')
    })
  }

  down () {
    this.dropIfExists('admins')
  }
}

module.exports = AdminsTableSchema
