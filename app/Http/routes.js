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
Route.get('login','LoginController.login')
Route.resource('cashier','CashierController')
Route.resource('admin','AdminController')
Route.resource('pharmacist','PharmacistController')
Route.resource('consumer','ConsumerController')
Route.resource('transaction',"TransactionController")
Route.on('/').render('welcome')
