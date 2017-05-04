'use strict'

const CompMed = use('App/Model/CompoundedMedicine')
const BasicMed = use('App/Model/BasicMedicine')
const Compounding = use('App/Model/Compounding')

class CompoundMedController {

  * index(request, response) {
    //show all data in database
    const compMed=yield CompMed.all()
    yield response.sendView('compMed/index',{compMed:compMed.toJSON()})
  }

  * create(request, response) {
    //create new data
    const compMed=yield Compounding.all()
    var compMedLast = new CompMed()
    yield response.sendView('compMed/create',{compMed:compMed.toJSON(),compMedLast:compMedLast.toJSON()})
  }

  * store(request, response) {
    //store created data to database
    const compMed = new CompMed()
    var res=0
    const compounding=yield Compounding.all()
    console.log(compounding)
    // for each (var cmp in compounding){
    //   if(cmp.compMedID ==compMed.id){
    //     const basicMed=yield BasicMed.findBy('id',request.param('id'))
    //     res=res+basicMed.pricePerGram
    //   }
    // }
    compMed.price=res

    yield compMedData.save()
  }

  * show(request, response) {
    //show selected data from database
    const compMed=yield CompMed.findBy('id',request.param('id'))
    yield response.sendView('compMed/show',{compMed:compMed.toJSON()})
  }

  * edit(request, response) {
    //edit showed data
      const compMed=yield CompMed.findBy('id',request.param('id'))
    yield response.sendView('compMed/edit',{compMed:compMed.toJSON()})
  }

  * update(request, response) {
    //update edited data
    const compMedData = request.except('_csrf','submit')
    const compMed=yield CompMed.findBy('id',request.param('id'))
    compMed.codeName=compMedData.codeName
    yield compMed.save()
    yield response.redirect(request.param('id'))
  }

  * destroy(request, response) {
    //delete selected data
    const compMed=yield CompMed.findBy('id',request.param('id'))
    yield compMed.delete()
    yield response.redirect('/compMed')
  }

}

module.exports = CompoundMedController
