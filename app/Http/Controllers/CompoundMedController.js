'use strict'

const Database = use('Database')
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
    const basicMed=yield BasicMed.all()
    var compMedLast = yield CompMed.last()
    if(compMedLast==null||compMedLast.price!=0){
      console.log(compMedLast)
      compMedLast=new CompMed()
      compMedLast.price=0
      yield compMedLast.save()
    }
    var total=yield Database.from('compoundings').sum('subtotal as total').where('CompMedId',compMedLast.id)
    console.log(total[0].total)
    yield response.sendView('compMed/create',{compMed:compMed.toJSON(),compMedLast:compMedLast,basicMed:basicMed.toJSON(),total:total[0].total})
  }

  * store(request, response) {
    //store created data to database
    var res=0
    var compMedLast = yield CompMed.last()
    var total=yield Database.from('compoundings').sum('subtotal as total').where('CompMedId',compMedLast.id)
    compMedLast.price=total[0].total
    console.log(compMedLast.price)
    yield compMedLast.save()
    const compMed=yield CompMed.all()
    yield response.sendView('compMed/index',{compMed:compMed.toJSON()})
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
