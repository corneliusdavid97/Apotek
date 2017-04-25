'use strict'

const Pharmacist = use('App/Model/Pharmacist')

class PharmacistController {

  * index(request, response) {
    //show all data in database
    const pharmacist=yield Pharmacist.all()
    yield response.sendView('pharmacist/index',{pharmacist:pharmacist.toJSON()})
  }

  * create(request, response) {
    //create new data
    yield response.sendView('pharmacist/create')
  }

  * store(request, response) {
    //store created data to database
    const pharmacistData = request.except('_csrf','submit')
    console.log(pharmacistData)
    yield Pharmacist.create(pharmacistData)
    yield response.sendView('pharmacist/index')
  }

  * show(request, response) {
    //show selected data from database
    const pharmacist=yield Pharmacist.findBy('id',request.param('id'))
    yield response.sendView('pharmacist/show',{pharmacist:pharmacist.toJSON()})
  }

  * edit(request, response) {
    //edit showed data
    const pharmacist=yield Pharmacist.findBy('id',request.param('id'))
    yield response.sendView('pharmacist/edit',{pharmacist:pharmacist.toJSON()})
  }

  * update(request, response) {
    //update edited data
    const pharmacistData = request.except('_csrf','submit')
    const pharmacist=yield Pharmacist.findBy('id',request.param('id'))
    pharmacist.name=pharmacistData.name
    pharmacist.TelpNo=pharmacistData.TelpNo
    console.log(pharmacist)
    yield pharmacist.save()
    //console.log(pharmacistData)
    yield response.redirect(request.param('id'))
  }

  * destroy(request, response) {
    //delete selected data
    const pharmacist=yield Pharmacist.findBy('id',request.param('id'))
    yield pharmacist.delete()
    yield response.redirect('/pharmacist')
  }

}

module.exports = PharmacistController
