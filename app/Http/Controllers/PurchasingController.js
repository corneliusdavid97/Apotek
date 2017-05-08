'use strict'

const Purchasing = use('App/Model/Purchasing')

class PurchasingController {

  * index(request, response) {
    //show all data in database
    const purchasing=yield Purchasing.all()
    yield response.sendView('purchasing/index',{purchasing:purchasing.toJSON()})
  }

  * create(request, response) {
    //create new data
    yield response.sendView('purchasing/create')
  }

  * store(request, response) {
    //store created data to database
    const purchasingData = request.except('_csrf','submit')
    const purchasing=new Purchasing()
    purchasing.compMedID=purchasingData.compMedID
    purchasing.transactionID=purchasingData.transactionID
    purchasing.quantity=purchasingData.quantity
    purchasing.totalPrice=purchasingData.quantity*purchasingData.price
    yield purchasing.save()
    yield response.redirect('/cashier')
  }

  * show(request, response) {
    //show selected data from database
    const purchasing=yield Purchasing.findBy('id',request.param('id'))
    yield response.sendView('purchasing/show',{purchasing:purchasing.toJSON()})
  }

  * edit(request, response) {
    //edit showed data
    const purchasing =yield Purchasing.findBy('id',request.param('id'))
    yield response.sendView('purchasing/edit',{purchasing:purchasing.toJSON()})
  }

  * update(request, response) {
    //update edited data
    const purchasingData = request.except('_csrf','submit')
    const purchasing=yield Purchasing.findBy('id',request.param('id'))
    purchasing.name=purchasingData.name
    purchasing.address=purchasingData.address
    purchasing.TelpNo=purchasingData.TelpNo
    purchasing.KISNumber=purchasingData.KISNumber
    purchasing.birthDate=purchasingData.birthDate
    yield purchasing.save()
    yield response.redirect(request.param('id'))
  }

  * destroy(request, response) {
    //delete selected data
    const purchasing=yield Purchasing.findBy('id',request.param('id'))
    yield purchasing.delete()
    yield response.redirect('/purchasing')
  }
}

module.exports = PurchasingController
