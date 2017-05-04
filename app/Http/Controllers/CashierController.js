'use strict'

const Cashier = use('App/Model/Cashier')
const Consumer = use('App/Model/Consumer')
const Transaction = use('App/Model/Transaction')

class CashierController {

  * index(request, response) {
    //show all data in database
    const cashier=yield Cashier.all()
    const consumer=yield Consumer.all()
    yield response.sendView('cashier/index',{cashier:cashier.toJSON(),consumer:consumer.toJSON()})
  }

  * create(request, response) {
    //create new data
    yield response.sendView('cashier/create')
  }

  * store(request, response) {
    //store created data to database
    const cashierData = request.except('_csrf','submit')
    const transaction = new Transaction()
    transaction.transactionAmount.cashierData.transactionAmount
    transaction.cashierID=cashierData.cashierID
    transaction.consumerID=cashierData.consumerID
    yield transaction.save()
    yield Cashier.create(cashierData)
  }

  * show(request, response) {
    //show selected data from database
    const cashier=yield Cashier.findBy('id',request.param('id'))
    yield response.sendView('cashier/show',{cashier:cashier.toJSON()})
  }

  * edit(request, response) {
    //edit showed data
    const cashier=yield Cashier.findBy('id',request.param('id'))
    yield response.sendView('cashier/edit',{cashier:cashier.toJSON()})
  }

  * update(request, response) {
    //update edited data
    const cashierData = request.except('_csrf','submit')
    const cashier=yield Cashier.findBy('id',request.param('id'))
    cashier.name=cashierData.name
    cashier.userId=cashierData.userId
    cashier.TelpNo=cashierData.TelpNo
    yield cashier.save()
    yield response.redirect(request.param('id'))
  }

  * destroy(request, response) {
    //delete selected data
    const cashier=yield Cashier.findBy('id',request.param('id'))
    yield cashier.delete()
    yield response.redirect('/cashier')
  }

}

module.exports = CashierController
