const MongoClient = require('mongodb').MongoClient
const assert = require('assert')
const url = process.env.MONGO_DB;

const insert = (db, body, callback) => {
  const collection = db.collection('categories')
  collection.findOne({ name: body.name }, (err, result) => {
    if (result) {
      db.close()
      callback(true, null)
    } else {
      collection.insertOne(body, (err, result) => {
        db.close()
        callback(err, result)
      })
    }
  })
}

module.exports = (req, res) => {
  MongoClient.connect(url, function(err, db) {
    if (req.body.name) {
      insert(db, req.body, (err, result) => {
        if (err) {
          return res.send({ status: false })   
        }
        return res.send({ status: true })
      })
    } else {
      return res.send({ status: false })
    } 
  })
}
