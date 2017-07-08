
const express = require('express')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare()
.then(() => {
  const server = express()

  server.post('/api/forecast/expenses', (req, res) => {
      
  })

  server.get('/api/dashboard', (req, res) => {
    return res.send({
        results: [
            { name: 'Receitas', tp: 94700, tr: 17900 },
            { name: 'Despesas', tp: 38300, tr: 9200 }
        ],
        revenueForecasts: [
            { name: 'Ingressos', tp: 94700, tr: 17900 },
            { name: 'Patrocínio', tp: 38300, tr: 9200 },
            { name: 'Consumo', tp: 38300, tr: 9200 }
        ],
        expensesForecast: [
            { name: 'Local', tp: 94700, tr: 17900 },
            { name: 'Palestrantes', tp: 38300, tr: 9200 },
            { name: 'Infraestrutura', tp: 380, tr: 900 },
            { name: 'Publicidade', tp: 380, tr: 900 }
        ]
    })
  })

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(3000, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
})