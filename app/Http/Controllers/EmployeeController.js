'use strict'

const Employee = use('App/Model/Employee')

class EmployeeController {

  * index(request, response) {
    //show all data in database
    const employee=yield Employee.all()
    yield response.sendView('employee/index',{employee:employee.toJSON()})
  }

  * create(request, response) {
    //create new data
    yield response.sendView('employee/create')
  }

  * store(request, response) {
    //store created data to database
    const employeeData = request.except('_csrf','submit')
    yield Employee.create(employeeData)
  }

  * show(request, response) {
    //show selected data from database
    const employee=yield Employee.findBy('id',request.param('id'))
    yield response.sendView('employee/show',{employee:employee.toJSON()})
  }

  * edit(request, response) {
    //edit showed data
    cconst employee=yield Employee.findBy('id',request.param('id'))
    yield response.sendView('employee/edit',{employee:employee.toJSON()})
  }

  * update(request, response) {
    //update edited data
    const employeeData = request.except('_csrf','submit')
    const employee=yield Employee.findBy('id',request.param('id'))
    employee.username=employeeData.username
    employee.password=employeeData.password
    employee.adminId=employeeData.adminId
    employee.PharmacistId=employeeData.PharmacistId
    employee.cashierId=employeeData.cashierId
    yield employee.save()
    yield response.redirect(request.param('id'))
  }

  * destroy(request, response) {
    //delete selected data
    const employee=yield Employee.findBy('id',request.param('id'))
    yield employee.delete()
    yield response.redirect('/employee')
  }

}

module.exports = EmployeeController
