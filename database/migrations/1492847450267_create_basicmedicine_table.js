'use strict'

const Schema = use('Schema')

class BasicMedicineTableSchema extends Schema {

  up () {
    this.create('basic_medicines', (table) => {
      table.increments()
      table.timestamps()
      table.string('name')
      table.integer('pricePerGram')
      table.integer('stock')
    })
  }

  down () {
    this.dropIfExists('basic_medicines')
  }

}

module.exports = BasicMedicineTableSchema
