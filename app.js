var createError = require('http-errors');
var express = require('express');
var router = express.Router()
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var firebase = require('./routes/firebase');
var job = require('./jobs/refreashIds')
var mail = require('./mail/nodemailer')
var tokenVerify = require('./graphql/verifytoken')
var graphql = require('./graphql/graphql')
var passport = require('./passportJS/passport')
var app = express(); 


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(tokenVerify);
app.use('/', indexRouter);
app.use('/', graphql);
app.use('/', passport);
app.use('/users', usersRouter);
app.use('/', firebase)
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

 

module.exports = app;
