'use strict'

const Lucid = use('Lucid')
const Hash = use('Hash')

class Employee extends Lucid {

  static boot () {
    super.boot()

    /**
     * Hashing password before storing to the
     * database.
     */
    this.addHook('beforeCreate', function * (next) {
      this.password = this.password
      yield next
    })
  }

  apiTokens () {
    return this.hasMany('App/Model/Token')
  }

}

module.exports = Employee
