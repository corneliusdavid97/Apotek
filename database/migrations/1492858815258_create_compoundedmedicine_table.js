'use strict'

const Schema = use('Schema')

class CompoundedmedicinesTableSchema extends Schema {

  up () {
    this.create('compounded_medicines', (table) => {
      table.increments()
      table.timestamps()
      table.string('codeName').unique()
    })
  }

  down () {
    this.dropIfExists('compounded_medicines')
  }

}

module.exports = CompoundedmedicinesTableSchema
