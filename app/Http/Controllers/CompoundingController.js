'use strict'

const Compounding = use('App/Model/Compounding')
const CompMed = use('App/Model/CompoundedMedicine')

class CompoundingController {

  * index(request, response) {
    //show all data in database
    const compounding=yield Compounding.all()
    yield response.sendView('compounding/index',{compounding:compounding.toJSON()})
  }

  * create(request, response) {
    //create new data
    yield response.sendView('compounding/create')
  }

  * store(request, response) {
    //store created data to database
    const compoundingData = request.except('_csrf','submit')
    const compounding = new Compounding()
    const last=yield CompMed.last()
    var id
    if(last==null){
      id=1
    }else{
      if(last.price==null){
        const tmp=new CompMed()
        yield tmp.save()
      }else{
        id=last.id
      }
    }
    compounding.basicMedID=compoundingData.id
    compounding.compMedID=id
    yield compounding.save()
  }

  * show(request, response) {
    //show selected data from database
    const compounding=yield Compounding.findBy('id',request.param('id'))
    yield response.sendView('compounding/show',{compounding:compounding.toJSON()})
  }

  * edit(request, response) {
    //edit showed data
    const compounding=yield Compounding.findBy('id',request.param('id'))
    yield response.sendView('compounding/edit',{compounding:compounding.toJSON()})
  }

  * update(request, response) {
    //update edited data
    const compoundingData = request.except('_csrf','submit')
    const compounding=yield Compounding.findBy('id',request.param('id'))
    compounding.name=compoundingData.name
    compounding.compoundingDate=compoundingData.compoundingDate
    compounding.compoundingTime=compoundingData.compoundingTime
    compounding.cashierId=compoundingData.cashierId
    compounding.consumerId=compoundingData.consumerId
    yield compounding.save()
    yield response.redirect(request.param('id'))
  }

  * destroy(request, response) {
    //delete selected data
    const compounding=yield Compounding.findBy('id',request.param('id'))
    yield compounding.delete()
    yield response.redirect('/compounding')
  }
}

module.exports = CompoundingController
