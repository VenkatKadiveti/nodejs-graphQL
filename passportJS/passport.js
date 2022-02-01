var express = require('express');
var app = express.Router();
var passport = require('passport');
var Strategy = require('passport-facebook').Strategy;

passport.use(new Strategy({
    clientID: '2299047950164863',
    clientSecret: 'bacc023825b86510fab55a7b58b2bf7d',
    callbackURL: '/return'
  },
  function(accessToken, refreshToken, profile, cb) {
      console.log(accessToken, refreshToken,profile)
    return cb(null, profile);
  }));



  // Define routes.
app.get('/',
function(req, res) {
  res.render('home', { user: req.user });
});

app.get('/login',
function(req, res){
  res.render('login');
});

app.get('/login/facebook',
passport.authenticate('facebook'));

app.get('/return', 
passport.authenticate('facebook', { failureRedirect: '/login' }),
function(req, res) {
  res.redirect('/');
});

app.get('/profile',
require('connect-ensure-login').ensureLoggedIn(),
function(req, res){
  res.render('profile', { user: req.user });
});

module.exports = app;

// https://accounts.google.com/o/oauth2/v2/auth?response_type=code&redirect_uri=http%3A%2F%2Fwww.example.com%2Fauth%2Fgoogle%2Fcallback&scope=profile&client_id=973439709552-b5mssdftr7u2b6egan5nq7v3aonop1k7.apps.googleusercontent.com