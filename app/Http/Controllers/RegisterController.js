'use strict'

const User = use('App/Model/Employee')
const Hash = use('Hash')

class RegisterController {
    * index(request, response) {
        yield response.sendView('register')
    }

    * doRegister(request, response) {
        const user = new User()
        user.username = request.input('username')
        user.password = yield Hash.make(request.input('password'))
        user.role=request.input('role')

        yield user.save()

        var registerMessage = {
            success: 'Registration Successful! Now go ahead and login'
        }

        yield response.sendView('login', { registerMessage : registerMessage })
    }
}

module.exports = RegisterController
