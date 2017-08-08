const MongoClient = require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectId
const assert = require('assert')
const url = process.env.MONGO_DB;

const insert = (db, body, callback) => {
  const collection = db.collection('staff')
  collection.insertOne({ staff: body.staff, pricing: parseFloat(body.pricing), url: body.url }, (err, result) => {
    db.close()
    callback(err, result)
  })
}

module.exports = (req, res) => {
  MongoClient.connect(url, function(err, db) {
    if (req.body.staff) {
      insert(db, req.body, (err, result) => {
        if (err) {
          return res.send({ status: false, message: result })   
        }
        return res.send({ status: true, message: result })
      })
    } else {
      return res.send({ status: false, message: result })
    } 
  })
}
