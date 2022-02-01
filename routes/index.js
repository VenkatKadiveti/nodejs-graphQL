var express = require('express');
var router = express.Router();
var db = require('../database/db')

router.get('/', function (req, res, next) {
  db.client.collection("Books").find().toArray(function (err, result) {
    if (result) {
      var responseData = [];
      result.map(x => (x._id = Math.random() * 100))
      // with Promise 
      result.forEach((x, index) => {
        formResponseWithPromise(x).then(d => {
          responseData.push({ insertedId: d });
          if (index === result.length - 1) {
            res.send(responseData);
          }
        });
      })
    } else {
      res.send("database not connected")
    }
  });
});


var formResponseWithPromise = function (data) {
  return new Promise((resolve, reject) => {
    db.client.collection("Books").insertOne(data, (err, result) => {
      if (err) {
        reject(err)
      }
      else {
        resolve(result.insertedId)
      }
    })
  })
}
module.exports = router;
