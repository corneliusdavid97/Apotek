'use strict'

/*
|--------------------------------------------------------------------------
| Router
|--------------------------------------------------------------------------
|
| AdonisJs Router helps you in defining urls and their actions. It supports
| all major HTTP conventions to keep your routes file descriptive and
| clean.
|
| @example
| Route.get('/user', 'UserController.index')
| Route.post('/user', 'UserController.store')
| Route.resource('user', 'UserController')
*/

const Route = use('Route')
Route.resource('cashier','CashierController')
Route.resource('admin','AdminController')
Route.resource('pharmacist','PharmacistController')
Route.resource('consumer','ConsumerController')
Route.resource('transaction',"TransactionController")
Route.resource('basicMed',"BasicMedController")
Route.resource('employee',"EmployeeController")
Route.resource('compounding',"CompoundingController")
Route.resource('purchasing',"PurchasingController")
Route.resource('compMed',"CompoundMedController")
Route.on('/').render('login')
Route.on('/master').render('master')
Route.on('/register').render('register')

  Route.get('/login', 'AuthController.index')
  Route.post('/login', 'AuthController.login')

  Route.get('/logout', 'AuthController.index')
  Route.post('/logout', 'AuthController.logout')

  Route.get('/register', 'RegisterController.index')
  Route.post('register', 'RegisterController.doRegister')
