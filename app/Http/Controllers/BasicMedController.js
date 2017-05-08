'use strict'

const BasicMed = use('App/Model/BasicMedicine')

class BasicMedController {

  * index(request, response) {
    //show all data in database
    const basicMed=yield BasicMed.all()
    yield response.sendView('basicMed/index',{basicMed:basicMed.toJSON()})
  }

  * create(request, response) {
    //create new data
    yield response.sendView('basicMed/create')
  }

  * store(request, response) {
    //store created data to database
    const basicMedData = request.except('_csrf','submit')
    yield BasicMed.create(basicMedData)
    const basicMed=yield BasicMed.all()
    yield response.sendView('basicMed/index',{basicMed:basicMed.toJSON()})
  }

  * show(request, response) {
    //show selected data from database
    const basicMed=yield BasicMed.findBy('id',request.param('id'))
    yield response.sendView('basicMed/show',{basicMed:basicMed.toJSON()})
  }

  * edit(request, response) {
    //edit showed data
    const basicMed=yield BasicMed.findBy('id',request.param('id'))
    yield response.sendView('basicMed/edit',{basicMed:basicMed.toJSON()})
  }

  * update(request, response) {
    //update edited data
    const basicMedData = request.except('_csrf','submit')
    const basicMed=yield BasicMed.findBy('id',request.param('id'))
    basicMed.name=basicMedData.name
    basicMed.pricePerGram=basicMedData.pricePerGram
    basicMed.stock=basicMedData.stock
    yield basicMed.save()
    yield response.redirect(request.param('id'))
  }

  * destroy(request, response) {
    //delete selected data
    const basicMed=yield BasicMed.findBy('id',request.param('id'))
    yield basicMed.delete()
    yield response.redirect('/basicMed')
  }

}

module.exports = BasicMedController
