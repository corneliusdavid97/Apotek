'use strict'

const Schema = use('Schema')

class ConsumersTableSchema extends Schema {

  up () {
    this.create('consumers', (table) => {
      table.increments()
      table.timestamps()
      table.string('name')
      table.string('address')
      table.string('TelpNo')
      table.boolean('haveKIS')
      table.date('birthDate')
      table.integer('age')
    })
  }

  down () {
    this.dropIfExists('consumers')
  }

}

module.exports = ConsumersTableSchema
