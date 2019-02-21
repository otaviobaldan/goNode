const express = require('express')
const routes = express.Router()
const multerConfig = require('./config/multer')
const upload = require('multer')(multerConfig)

const UserController = require('../src/app/controllers/UserController')
const SessionController = require('../src/app/controllers/SessionController')

routes.get('/', SessionController.create)
routes.post('/signin', SessionController.store)

routes.get('/signup', UserController.create)
routes.post('/signup', upload.single('avatar'), UserController.store)

routes.get('/app/dashboard', (req, res) => res.render('dashboard'))

module.exports = routes
