const express = require('express')
const routes = express.Router()
const multerConfig = require('./config/multer')
const upload = require('multer')(multerConfig)

const authMiddleware = require('./app/middlewares/auth')
const guestMiddleware = require('./app/middlewares/guest')

const UserController = require('../src/app/controllers/UserController')
const SessionController = require('../src/app/controllers/SessionController')
const DashboardController = require('../src/app/controllers/DashboardController')
const FileController = require('../src/app/controllers/FileController')
const AppointmentController = require('../src/app/controllers/AppointmentController')
const AvailableController = require('../src/app/controllers/AvailableController')

routes.use((req, res, next) => {
  res.locals.flashSuccess = req.flash('success')
  res.locals.flashError = req.flash('error')

  next()
})

routes.use('/app', authMiddleware)

routes.get('/files/:file', FileController.show)

routes.get('/', guestMiddleware, SessionController.create)
routes.post('/signin', SessionController.store)

routes.get('/signup', guestMiddleware, UserController.create)
routes.post('/signup', upload.single('avatar'), UserController.store)

routes.get('/app/logout', SessionController.destroy)

routes.get('/app/dashboard', DashboardController.index)

routes.get('/app/appointments/new/:provider', AppointmentController.create)
routes.post('/app/appointments/new/:provider', AppointmentController.store)

routes.get('/app/available/:provider', AvailableController.index)

module.exports = routes
