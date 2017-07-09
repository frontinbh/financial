const MongoClient = require('mongodb').MongoClient
const assert = require('assert');
const url = process.env.MONGO_DB;

module.exports = (req, res) => {
  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    console.log("Connected correctly to server");
    db.close()
    return res.send('oi expenses')
  })
}
