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
          id: revenue._id,
          category: revenue.name,
          itens: revenue.itens.map(i => Object.assign(i.values.value, { id: i._id })),
          total_revenue: revenue.itens.map(i => parseInt(i.values.value.revenue, 10)).reduce((a, b) => a + b, 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
          total_expenses: revenue.itens.map(i => parseInt(i.values.value.expenses, 10)).reduce((a, b) => a + b, 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
        }
      })
      return res.send(revenues)
    })
  })
}
