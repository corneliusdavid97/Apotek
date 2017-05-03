'use strict'

const Employee = exports = module.exports = {}

Employee.encryptPassword = function * (next) {
  // {this} belongs to model instance
  this.password=yield Hash.make(this.password)
  yield next
}
