'use strict'

const Schema = use('Schema')

class PurchasingsTableSchema extends Schema {

  up () {
    this.create('purchasings', (table) => {
      table.increments()
      table.timestamps()
      table.integer('compMedID').unsigned().index().references('id').inTable('compounded_medicines')
      table.integer('transactionID').unsigned().index().references('id').inTable('transactions')
      table.integer('quantity')
      table.integer('totalPrice')
    })
  }

  down () {
    this.dropIfExists('purchasings')
  }

}

module.exports = PurchasingsTableSchema
