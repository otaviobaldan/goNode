const express = require('express')
const session = require('express-session')
const FileStore = require('session-file-store')(session)
const nunjucks = require('nunjucks')
const dateFilter = require('nunjucks-date-filter')
const path = require('path')
const flash = require('connect-flash')

class App {
  constructor () {
    this.express = express()
    this.isDev = process.env.NODE_ENV !== 'production'

    this.middlewares()
    this.views()
    this.routes()
  }

  middlewares () {
    this.express.use(express.urlencoded({ extended: false }))
    this.express.use(flash())
    this.express.use(
      session({
        name: 'root',
        secret: 'MyAppSecret',
        resave: true,
        store: new FileStore({
          path: path.resolve(__dirname, '..', 'tmp', 'sessions')
        }),
        saveUninitialized: true
      })
    )
  }

  views () {
    // configurações default do nunjunks
    const env = nunjucks.configure(path.resolve(__dirname, 'app', 'views'), {
      autoescape: true,
      express: this.express,
      watch: this.isDev
    })

    env.addFilter('date', dateFilter)

    // com o uso do static a pasta passa a ser enxergada por todos os arquivos
    this.express.use(express.static(path.resolve(__dirname, 'public')))
    // define a engine de view para njk
    this.express.set('view engine', 'njk')
  }

  routes () {
    this.express.use(require('./routes'))
  }
}

// importando uma instância do app
module.exports = new App().express
