import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
  Route.group(() => {
    Route.get('/', 'UsersController.getUser')
    Route.get('/users', 'UsersController.getAll')
    Route.post('/login', 'UsersController.login')
    Route.put('/:id', 'UsersController.update')
    Route.get('/:email', 'UsersController.check')
    Route.post('/logout', 'UsersController.logout')
    Route.put('', 'UsersController.updateImage')

    Route.post('/', 'UsersController.create')
  }).prefix('/users')

  Route.group(() => {
    Route.get('/', 'StadiumsController.getAll')
    Route.get('/stadiums', 'StadiumsController.getSearch')
    Route.post('/', 'StadiumsController.create')
    Route.put('/:id', 'StadiumsController.update')
  }).prefix('/stadiums')

  Route.group(() => {
    Route.get('/', 'LocationsController.getAll')
  }).prefix('/locations')

  Route.group(() => {
    Route.get('/', 'ReviewsController.getAll')
    Route.get('/user', 'ReviewsController.getByuser')

    Route.post('/', 'ReviewsController.create')
  }).prefix('/reviews')

  Route.group(() => {
    Route.get('/', 'OpeningTimesController.getAll')
  }).prefix('/openTimes')

  Route.group(() => {}).prefix('/countries')

  Route.group(() => {}).prefix('/cities')

  Route.group(() => {}).prefix('/address')

  Route.group(() => {
    Route.get('/', 'ReservationsController.getAll')
    Route.get('/latest', 'ReservationsController.getReservation')
    Route.post('/', 'ReservationsController.create')
    Route.put('/', 'ReservationsController.update')
  }).prefix('/reservations')

  Route.group(() => {
    Route.get('/Payments', 'paymentsController.gets')
    Route.get('/', 'PaymentsController.getAll')
    Route.post('/', 'PaymentsController.create')
  }).prefix('/payments')

  Route.group(() => {
    Route.post('/send-email', 'EmailController.sendEmail')
  }).prefix('/emails')

  Route.group(() => {
    Route.get('/', 'InvoicesController.getInvoice')
    Route.post('/', 'InvoicesController.create')
  }).prefix('/invoices')
}).prefix('api')
