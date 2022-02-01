var express = require('express')
var router = express.Router();
var firebase = require('firebase-admin');
var serviceaccount = require('../firebase-serviceaccount.json')
firebase.initializeApp({
    credential: firebase.credential.cert(serviceaccount),
    databaseURL: 'https://myapp-1777a.firebaseio.com/',
    storageBucket: 'gs://myapp-1777a.appspot.com'
})
var db = firebase.database();
var firestore = firebase.firestore();
var storage = firebase.storage().bucket();
router.get('/firebase/getAll', (req, res) => {
    var ref = db.ref("item");
    var response = {
        rules: '',
        result: ''
    };
    db.getRulesJSON().then(dbRules => {
        response.rules = dbRules.rules;
        ref.once("value", function (snapshot) {
            response.result = snapshot.val()
            res.send(response);
        });
    })


})


router.get('/firebase/insert', (req, res) => {
    var ref = db.ref("item");
    var userRef = ref.child("FPA00121147");
    userRef.set({
        date_of_birth: "June 23, 1912",
        full_name: "Alan Turing"
    })
    res.send('success')
})
router.get('/firebase/getByID', (req, res) => {
    // id FPA00121147, which is getting from client and using that id we can get data from firebase
    var ref = db.ref("item/FPA00121147")
    ref.once("value", (snapshot) => {
        res.send(snapshot.val())
    })
})
router.get('/firebase/update', (req, res) => {
    // id FPA00121147, which is getting from client and using that id we can get data from firebase
    var ref = db.ref("item/FPA00121147")
    ref.set({
        date_of_birth: "June 23, 1922",
        full_name: "Alan Turing"
    })
    ref.once("value", (snapshot) => {
        res.send(snapshot.val())
    })
})

router.get('/firebase/delete', (req, res) => {
    var ref = db.ref("item/FPA00121147")
    res.send(ref.remove())
})


router.get('/firestore/addData', (req, res) => {
    var docRef = firestore.collection("user").doc('FPA147852');
    docRef.set({
        first: 'Ada',
        last: 'Lovelace',
        born: 1815
    })
    res.send('success')
})

router.get('/firestore/get', (req, res) => {
    firestore.collection("user").get().then(snapshot => {
        snapshot.forEach((doc) => {
            console.log(doc.id, '=>', doc.data());
            res.send(doc.data())
        });
    });
})

router.get('/storage/getAll', (req, res) => {
    var ref = storage.getFiles().then(result=>{
        res.send(result)
    })
})
module.exports = router;