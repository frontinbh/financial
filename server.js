
const express = require('express')
const next = require('next')
const bodyParser = require('body-parser')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const PORT = process.env.PORT || 3000

app.prepare()
.then(() => {
  const server = express()
  server.use(bodyParser.urlencoded({ extended: false }))
  server.use(bodyParser.json())
  
  server.post('/api/forecast/categories-revenue', require('./api/forecast/add-categories-revenues'))
  server.post('/api/forecast/categories-expenses', require('./api/forecast/add-categories-expenses'))
  
  server.post('/api/forecast/expenses', require('./api/forecast/add-expenses'))
  server.put('/api/forecast/expenses/:id', require('./api/forecast/edit-expenses'))
  server.get('/api/forecast/expenses', require('./api/forecast/expenses'))

  server.post('/api/forecast/revenue', require('./api/forecast/add-revenue'))
  server.put('/api/forecast/revenue/:id', require('./api/forecast/edit-revenue'))
  server.get('/api/forecast/revenue', require('./api/forecast/revenue'))
  
  server.post('/api/staff', require('./api/staff'))
  server.get('/api/staff', require('./api/staff/get'))
  server.get('/api/sign-s3', require('./api/s3'));
  
  server.get('/api/dashboard', require('./api/dashboard'))
  server.get('*', (req, res) => handle(req, res))

  server.listen(PORT, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${PORT}`)
  })
})
