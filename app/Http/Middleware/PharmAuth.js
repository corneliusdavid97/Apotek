'use strict'

const auth = use('basic-auth')
const User = use('App/Model/Employee')
const Hash = use('Hash')

class PharmAuth {

  * handle (request, response, next) {
    // here goes your middleware logic
    // yield next to pass the request to next middleware or controller
    const credentials = auth(request.request)
    debug(credentials)
    if (!credentials) {
      response.status(401).send({
        error: 'Please enter your account credentials'
      })
      return
    }
    const employee = yield Employee
      .where('username', credentials.name)
      .first()
      .fetch()

    if (!user.size()) {
      response.status(401).send({
        error: 'Please enter your account credentials'
      })
      return
    }

    const employeePassword = employee.get('password')
    const result = yield Hash.verify(credentials.pass, employeePassword)

    if (!result) {
      response.status(401).send({
        error: 'Password mismatch'
      })
      return
    }

    // it is important to yield next if authentication is successful.
    yield next
  }

}

module.exports = PharmAuth
