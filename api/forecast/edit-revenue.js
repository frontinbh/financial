const MongoClient = require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectId
const assert = require('assert')
const url = process.env.MONGO_DB;

const update = (db, body, id, callback) => {
  console.log(
    body,
    id
  )
  const collection = db.collection('revenues')
  collection.updateOne(
    { _id: ObjectId(id) },
    { categoryId: ObjectId(body.category), values: body},
    {upsert: true, safe: false},
    (err, result) => {
    db.close()
    callback(err, result)
  })
}

module.exports = (req, res) => {
  MongoClient.connect(url, function(err, db) {
    const id = req.params.id
    update(db, req.body, id, (err, result) => {
      return res.send({ status: true, result })
    })
  })
}
