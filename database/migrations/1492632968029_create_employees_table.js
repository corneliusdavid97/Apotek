'use strict'

const Schema = use('Schema')

class EmployeeTableSchema extends Schema {

  up () {
    this.create('employees', table => {
      table.increments()
      table.timestamps()
      table.string('name')
      table.string('username', 80).notNullable().unique()
      table.string('password', 60).notNullable()
      table.string('TelpNo').unique()
      table.string('role').notNullable()
    })
  }

  down () {
    this.dropIfExists('employees')
  }

}

module.exports = EmployeeTableSchema
