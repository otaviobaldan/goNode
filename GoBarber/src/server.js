const express = require('express')
const nunjucks = require('nunjucks')
const path = require('path')

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
  }

  views () {
    // configurações default do nunjunks
    nunjucks.configure(path.resolve(__dirname, 'app', 'views'), {
      autoescape: true,
      express: this.express,
      watch: this.isDev
    })

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
