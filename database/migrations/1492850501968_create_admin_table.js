'use strict'

const Schema = use('Schema')

class AdminsTableSchema extends Schema {

  up () {
    this.create('admins', (table) => {
      table.increments()
      table.timestamps()
      table.string('name')
      table.string('TelpNo').unique()
    })
  }

  down () {
    this.dropIfExists('admins')
  }
}

module.exports = AdminsTableSchema
