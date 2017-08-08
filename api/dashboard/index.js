const MongoClient = require('mongodb').MongoClient
const assert = require('assert')
const url = process.env.MONGO_DB

const find = (db, query, callback) => {
  const collection = db.collection('categories-revenues')
  collection.aggregate([
    {
       $lookup:
         {
           from: "revenues",
           localField: "_id",
           foreignField: "categoryId",
           as: "itens"
         }
    }
  ]).toArray((err, result) => {
      callback(err, result)
  })
}

const findExpenses = (db, query, callback) => {
  const collection = db.collection('categories-expenses')
  collection.aggregate([
    {
       $lookup:
         {
           from: "expenses",
           localField: "_id",
           foreignField: "categoryId",
           as: "itens"
         }
    }
  ]).toArray((err, result) => {
      callback(err, result)
  })
}

const findCashbacks = (db, query, callback) => {
  const collection = db.collection('staff')
  collection.find({}).toArray((err, result) => {
      callback(err, result)
  })
}

module.exports = (req, res) => {

   MongoClient.connect(url, (err, db) => {
    find(db, {}, (err, result) => {
      const revenues = result.map(revenue => {
        return {
          name: revenue.name,
          tr: revenue.itens.map(i => parseInt(i.values.value.revenue, 10)).reduce((a, b) => a + b, 0),
          tp: revenue.itens.map(i => parseInt(i.values.value.expenses, 10)).reduce((a, b) => a + b, 0),
        }
      })

      findExpenses(db, {}, (err, result) => {
        const expenses = result.map(expense => {
          return {
            name: expense.name,
            tr: expense.itens.map(i => parseInt(i.values.value.revenue, 10)).reduce((a, b) => a + b, 0),
            tp: expense.itens.map(i => parseInt(i.values.value.expenses, 10)).reduce((a, b) => a + b, 0),
          }
        })

        findCashbacks(db, {}, (err, cashbacks) => {
          db.close()
          const cashbacksCount = cashbacks.map(cash => {
            return {
              name: cash.staff,
              tr: cash.pricing,
              tp: cash.pricing,
            }
          })

          return res.send({
            results: [
              {
                name: 'Receitas', 
                tp: revenues.map(x => x.tp).reduce((a,b) => a + b, 0),
                tr: revenues.map(x => x.tr).reduce((a,b) => a + b, 0)
              },
              {
                name: 'Despesas',
                tp: expenses.map(x => x.tp).reduce((a,b) => a + b, 0),
                tr: expenses.map(x => x.tr).reduce((a,b) => a + b, 0)
              },
              {
                name: 'Reembolsos',
                tp: cashbacks.map(x => x.pricing).reduce((a,b) => a + b, 0),
                tr: cashbacks.map(x => x.pricing).reduce((a,b) => a + b, 0)
              },
            ],
            revenueForecasts: revenues,
            expensesForecast: expenses,
            cashbacks: cashbacksCount
          })
        })

      })
      
    })
  })
}
