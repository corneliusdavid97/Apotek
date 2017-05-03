'use strict'

const User = use('App/Model/Employee')
const Hash = use('Hash')

class AuthController {

    * index(request, response) {
        yield response.sendView('login')
    }

    * login(request, response) {
        const username = request.input('username')
        const password = request.input('password')

        const loginMessage = {
            success: 'Logged-in Successfully!',
            error: 'Invalid Credentials'
        }

        // Attempt to login with email and password
        const authCheck = yield request.auth.attempt(username, password)
        if (authCheck) {
            const user= yield User.findBy('username',username)
            if(user.role=='Admin'){
              return response.redirect('/admin')
            }
            if(user.role=='Pharmacist'){
              return response.redirect('/pharmacist')
            }
            if(user.role=='Cashier'){
              return response.redirect('/cashier')
            }
        }

        yield response.sendView('login', { error: loginMessage.error })
    }

    * logout(request, response) {
        yield request.auth.logout()

        return response.redirect('/')
    }
}

module.exports = AuthController
