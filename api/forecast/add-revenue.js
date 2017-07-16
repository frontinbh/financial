const MongoClient = require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectId
const assert = require('assert')
const url = process.env.MONGO_DB;

const insert = (db, body, callback) => {
  const collection = db.collection('revenues')
  collection.insertOne({ categoryId: ObjectId(body.category), values: body}, (err, result) => {
    db.close()
    callback(err, result)
  })
}

module.exports = (req, res) => {
  MongoClient.connect(url, function(err, db) {
    if (req.body.category) {
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
