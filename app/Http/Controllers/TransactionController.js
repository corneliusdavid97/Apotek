'use strict'

const Transaction = use('App/Model/Transaction')

class TransactionController {

  * index(request, response) {
    //show all data in database
    const transaction=yield Transaction.all()
    yield response.sendView('transaction/index',{transaction:transaction.toJSON()})
  }

  * create(request, response) {
    //create new data
    yield response.sendView('transaction/create')
  }

  * store(request, response) {
    //store created data to database
    const transactionData = request.except('_csrf','submit')
    const currentUser=request.currentUser
    const transaction=yield Transaction.last()
    transaction.transactionAmount=transactionData.grandTotal
    transaction.consumerID=transactionData.consumerID
    transaction.cashier=currentUser.id
    yield transaction.save()
    yield response.redirect('/cashier')
  }

  * show(request, response) {
    //show selected data from database
    const transaction=yield Transaction.findBy('id',request.param('id'))
    yield response.sendView('transaction/show',{transaction:transaction.toJSON()})
  }

  * edit(request, response) {
    //edit showed data
    const transaction=yield Transaction.findBy('id',request.param('id'))
    yield response.sendView('transaction/edit',{transaction:transaction.toJSON()})
  }

  * update(request, response) {
    //update edited data
    const transactionData = request.except('_csrf','submit')
    const transaction=yield Transaction.findBy('id',request.param('id'))
    transaction.name=transactionData.name
    transaction.transactionDate=transactionData.transactionDate
    transaction.transactionTime=transactionData.transactionTime
    transaction.cashierId=transactionData.cashierId
    transaction.consumerId=transactionData.consumerId
    yield transaction.save()
    yield response.redirect(request.param('id'))
  }

  * destroy(request, response) {
    //delete selected data
    const transaction=yield Transaction.findBy('id',request.param('id'))
    yield transaction.delete()
    yield response.redirect('/transaction')
  }
}

module.exports = TransactionController
