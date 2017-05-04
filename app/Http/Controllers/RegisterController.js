'use strict'

const User = use('App/Model/Employee')
const Admin = use('App/Model/Admin')
const Cashier = use('App/Model/Cashier')
const Pharmacist = use('App/Model/Pharmacist')
const Hash = use('Hash')

class RegisterController {
    * index(request, response) {
        yield response.sendView('register')
    }

    * doRegister(request, response) {
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
}

module.exports = RegisterController
