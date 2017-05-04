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
    const user = new User()
    user.username = request.input('username')
    user.password = yield Hash.make(request.input('password'))
    user.name = request.input('name')
    user.TelpNo = request.input('TelpNo')
    user.role=request.input('role')
    if(user.role == 'Admin'){
      const admin =new Admin()
      admin.userID=user.id
      yield admin.save()
    }else if(user.role == 'Cashier'){
      const cashier =new Cashier()
      cashier.userID=user.id
      yield cashier.save()
    }else if(user.role == 'Pharmacist'){
      const pharmacist =new Pharmacist()
      pharmacist.userID=user.id
      yield pharmacist.save()
    }


    yield user.save()

    var registerMessage = {
        success: 'Registration Successful! Now go ahead and login'
    }

    yield response.sendView('login', { registerMessage : registerMessage })
  }

  * show(request, response) {
    //show selected data from database
    const employee=yield Employee.findBy('id',request.param('id'))
    yield response.sendView('employee/show',{employee:employee.toJSON()})
  }

  * edit(request, response) {
    //edit showed data
    const employee=yield Employee.findBy('id',request.param('id'))
    yield response.sendView('employee/edit',{employee:employee.toJSON()})
  }

  * update(request, response) {
    //update edited data
    const employeeData = request.except('_csrf','submit')
    const employee=yield Employee.findBy('id',request.param('id'))
    employee.username=employeeData.username
    employee.password=employeeData.password
    employee.role=employeeData.role
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
