const express = require('express')
const nunjucks = require('nunjucks')

const app = express()

nunjucks.configure(__dirname + '/views', {
  autoescape: true,
  express: app,
  watch: true
})

app.set('view engine', 'njk')
app.use(express.urlencoded({ extended: false }))

checkQueryParam = (req, res, next) => {
  const { age } = req.query

  if (!age) res.redirect('/')

  next()
}

app.get('/', (req, res) => {
  res.render('home')
})

app.get('/major', checkQueryParam, (req, res) => {
  const { age } = req.query
  res.render('major', { age })
})

app.get('/minor', checkQueryParam, (req, res) => {
  const { age } = req.query

  res.render('minor', { age })
})

app.post('/check', (req, res) => {
  const { age } = req.body

  if (age >= 18) {
    return res.redirect(`/major?age=${age}`)
  } else {
    return res.redirect(`/minor?age=${age}`)
  }
})

app.listen('3000', (req, res) => {
  console.log('Server started at port 3000')
})
