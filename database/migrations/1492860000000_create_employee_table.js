'use strict'

const Schema = use('Schema')

class EmployeesTableSchema extends Schema {

  up () {
    this.create('employees', (table) => {
      table.increments()
      table.timestamps()
      table.string('username').unique()
      table.string('password')
      table.integer('adminId').unsigned().index().references('id').inTable('admins')
      table.integer('PharmacistId').unsigned().index().references('id').inTable('pharmacists')
      table.integer('cashierId').unsigned().index().references('id').inTable('cashiers')
    })
  }

  down () {
    this.dropIfExists('employees')
  }
}
module.exports = EmployeesTableSchema
