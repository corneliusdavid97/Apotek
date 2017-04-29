'use strict'

const CmpMed = use('App/Model/CompoundedMedicine')

class CompoundMedController {

  * index(request, response) {
    //show all data in database
    const cmpMed=yield CmpMed.all()
    yield response.sendView('cmpMed/index',{cmpMed:cmpMed.toJSON()})
  }

  * create(request, response) {
    //create new data
    yield response.sendView('cmpMed/create')
  }

  * store(request, response) {
    //store created data to database
    const cmpMedData = request.except('_csrf','submit')
    yield CmpMed.create(cmpMedData)
  }

  * show(request, response) {
    //show selected data from database
    const cmpMed=yield CmpMed.findBy('id',request.param('id'))
    yield response.sendView('cmpMed/show',{cmpMed:cmpMed.toJSON()})
  }

  * edit(request, response) {
    //edit showed data
      const cmpMed=yield CmpMed.findBy('id',request.param('id'))
    yield response.sendView('cmpMed/edit',{cmpMed:cmpMed.toJSON()})
  }

  * update(request, response) {
    //update edited data
    const cmpMedData = request.except('_csrf','submit')
    const cmpMed=yield CmpMed.findBy('id',request.param('id'))
    cmpMed.codeName=cmpMedData.codeName
    yield cmpMed.save()
    yield response.redirect(request.param('id'))
  }

  * destroy(request, response) {
    //delete selected data
    const cmpMed=yield CmpMed.findBy('id',request.param('id'))
    yield cmpMed.delete()
    yield response.redirect('/cmpMed')
  }

}

module.exports = CompoundMedController
