const MongoClient = require('mongodb').MongoClient
const assert = require('assert')
const url = process.env.MONGO_DB

const find = (db, query, callback) => {
  const collection = db.collection('categories')
  collection.aggregate([
    {
       $lookup:
         {
           from: "revenue",
           localField: "_id",
           foreignField: "categoryId",
           as: "itens"
         }
    }
  ]).toArray((err, result) => {
      db.close()
      callback(err, result)
  })
}

module.exports = (req, res) => {

   MongoClient.connect(url, (err, db) => {
    find(db, {}, (err, result) => {
      const revenues = result.map(revenue => {
        return {
          name: revenue.name,
          tp: revenue.itens.map(i => parseInt(i.values.value.revenue, 10)).reduce((a, b) => a + b, 0),
          tr: revenue.itens.map(i => parseInt(i.values.value.expenses, 10)).reduce((a, b) => a + b, 0),
        }
      })
      
      return res.send({
        results: [
          { name: 'Receitas', tp: revenues.map(x => x.tp).reduce((a,b) => a + b, 0), tr: revenues.map(x => x.tr).reduce((a,b) => a + b, 0) },
          { name: 'Despesas', tp: 0, tr: 0 }
        ],
        revenueForecasts: revenues,
        expensesForecast: []
      })
    })
  })
}
