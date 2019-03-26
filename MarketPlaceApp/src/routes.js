const express = require('express')

const routes = express.Router()

const authMiddleware = require('./app/middlewares/auth')

const controllers = require('./app/controllers')

routes.post('/users', controllers.UserController.store)
routes.post('/session', controllers.SessionController.store)
routes.get('/ping', authMiddleware, (req, res) => {
  res.status(200).json({ ok: true })
})

// todas as rotas daqui para baixo irão usar o middleware
routes.use(authMiddleware)

// Ads
routes.get('/ads', controllers.AdController.index)
routes.get('/ads/:id', controllers.AdController.show)
routes.post('/ads', controllers.AdController.store)
routes.put('/ads/:id', controllers.AdController.update)
routes.delete('/ads/:id', controllers.AdController.destroy)

// Send Mail
routes.post('/purchase', controllers.PurchaseController.store)

module.exports = routes
