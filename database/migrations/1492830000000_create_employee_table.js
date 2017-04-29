'use strict'

const Schema = use('Schema')

class EmployeesTableSchema extends Schema {

  up () {
    this.create('employees', (table) => {
      table.increments()
      table.timestamps()
      table.string('username').unique()
      table.string('password')
      table.integer('role')
    })
  }

  down () {
    this.dropIfExists('employees')
  }
}
module.exports = EmployeesTableSchema
