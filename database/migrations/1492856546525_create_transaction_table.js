'use strict'

const Schema = use('Schema')

class TransactionsTableSchema extends Schema {

  up () {
    this.create('transactions', (table) => {
      table.increments()
      table.timestamps()
      table.date('transactionDate')
      table.time('transactionTime')
      table.integer('cashierID').unsigned().index().references('id').inTable('cashiers')
      table.integer('consumerID').unsigned().index().references('id').inTable('consumers')
    })
  }

  down () {
    this.dropIfExists('transactions')
  }

}

module.exports = TransactionsTableSchema
