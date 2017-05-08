'use strict'

const Consumer = use('App/Model/Consumer')

class ConsumerController {

  * index(request, response) {
    //show all data in database
    const consumer=yield Consumer.all()
    yield response.sendView('consumer/index',{consumer:consumer.toJSON()})
  }

  * create(request, response) {
    //create new data
    yield response.sendView('consumer/create')
  }

  * store(request, response) {
    //store created data to database
    const consumerData = request.except('_csrf','submit')
    console.log(consumerData)
    yield Consumer.create(consumerData)
    yield response.redirect('/cashier')
  }

  * show(request, response) {
    //show selected data from database
    const consumer=yield Consumer.findBy('id',request.param('id'))
    yield response.sendView('consumer/show',{consumer:consumer.toJSON()})
  }

  * edit(request, response) {
    //edit showed data
    const consumer =yield Consumer.findBy('id',request.param('id'))
    yield response.sendView('consumer/edit',{consumer:consumer.toJSON()})
  }

  * update(request, response) {
    //update edited data
    const consumerData = request.except('_csrf','submit')
    const consumer=yield Consumer.findBy('id',request.param('id'))
    consumer.name=consumerData.name
    consumer.address=consumerData.address
    consumer.TelpNo=consumerData.TelpNo
    consumer.KISNumber=consumerData.KISNumber
    consumer.birthDate=consumerData.birthDate
    yield consumer.save()
    yield response.redirect(request.param('id'))
  }

  * destroy(request, response) {
    //delete selected data
    const consumer=yield Consumer.findBy('id',request.param('id'))
    yield consumer.delete()
    yield response.redirect('/consumer')
  }
}

module.exports = ConsumerController
