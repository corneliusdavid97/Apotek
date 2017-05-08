'use strict'

const Database = use('Database')
const Cashier = use('App/Model/Cashier')
const Consumer = use('App/Model/Consumer')
const Transaction = use('App/Model/Transaction')
const CompMed = use('App/Model/CompoundedMedicine')
const Purchasing = use('App/Model/Purchasing')

class CashierController {

  * index(request, response) {
    //show all data in database
    const cashier=yield Cashier.all()
    const consumer=yield Consumer.all()
    const compMed=yield CompMed.all()
    const purchasing=yield Purchasing.all()
    var transaction= yield Transaction.last()
    if(transaction==null || transaction.transactionAmount!=0){
      transaction=new Transaction()
      transaction.transactionAmount=0
      yield transaction.save()
    }
    var total=yield Database.from('purchasings').sum('totalPrice as total').where('transactionID',transaction.id)
    yield response.sendView('cashier/index',{cashier:cashier.toJSON(),consumer:consumer.toJSON(),compMed:compMed.toJSON(),transaction:transaction.toJSON(),purchasing:purchasing.toJSON(),total:total[0].total})
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
