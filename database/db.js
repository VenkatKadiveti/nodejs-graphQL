var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var client;
MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
    if (err) {
        return err;
    }
    client = db.db("Events");
    if (client) {
        module.exports.client = client;
    }
});


// const connectToDB = () => {
//    return new Promise((resolve, reject) => {
//         MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
//             if (err) {
//                 console.log('error')
//                 reject(err);
//             }
//             client = db.db("Events");
//             if (client) {
//                 console.log('client')
//                 resolve(client)
//             }
//         })
//     })
// }
// const dbCon = connectToDB().then(res=> res)
// console.log('dbCondb', dbCon)
// module.exports = dbCon