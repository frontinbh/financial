const MongoClient = require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectId
const assert = require('assert')
const _ = require('lodash')
const url = process.env.MONGO_DB;

const findAll = (db, callback) => {
  const collection = db.collection('staff')
  collection.find({}).toArray((err, result) => {
    db.close()
    callback(err, result)
  })
}

module.exports = (req, res) => {
  MongoClient.connect(url, function(err, db) {
    findAll(db, (err, result) => {
      if (err) {
        return res.send({ status: false, message: result })   
      }
      return res.send({ status: true, result: _.groupBy(result, 'staff') })
    })
  })
}
