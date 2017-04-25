'use strict'

const Admin = use('App/Model/Admin')

class AdminController {

  * index(request, response) {
    //show all data in database
    const admin=yield Admin.all()
    yield response.sendView('admin/index',{admin:admin.toJSON()})
  }

  * create(request, response) {
    //create new data
    yield response.sendView('admin/create')
  }

  * store(request, response) {
    //store created data to database
    const adminData = request.except('_csrf','submit')
    yield Admin.create(adminData)
  }

  * show(request, response) {
    //show selected data from database
    const admin=yield Admin.findBy('id',request.param('id'))
    yield response.sendView('admin/show',{supir:supir.toJSON()})
  }

  * edit(request, response) {
    //edit showed data
    const adminData = request.except('_csrf','submit')
    yield response.sendView('admin/show',{supir:supir.toJSON()})
  }

  * update(request, response) {
    //update edited data
    const adminData = request.except('_csrf','submit')
    const admin=yield Admin.findBy('id',request.param('id'))
    admin.name=adminData.name
    admin.userId=adminData.userId
    admin.TelpNo=adminData.TelpNo
    yield admin.save()
    yield response.redirect(request.param('id'))
  }

  * destroy(request, response) {
    //delete selected data
    const admin=yield Admin.findBy('id',request.param('id'))
    yield supir.delete()
    yield response.redirect('/admin')
  }

}

module.exports = AdminController
