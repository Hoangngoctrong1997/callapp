var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require("body-parser")
// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
var mysql = require('mysql');
var app = express();
//conecect MySQL
var connectDB = mysql.createConnection({
  host: "remotemysql.com",
  user: "b0XwX5ngbL",
  password: "NS6Hia4Tc4",
  database: "b0XwX5ngbL"
});
connectDB.connect(function(err) {
  var sql = "SELECT * FROM calltable";
  connectDB.query(sql, function(err, results) {
  })
});
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'node_modules')));
app.use(bodyParser.urlencoded({ extended: false }));
// app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.get('/', function (req, res) {
  let status = 2;
  var sql = "SELECT * FROM calltable WHERE status = ?";
  connectDB.query(sql,[status], function(err, results) {
    console.log("aaa",results)
    res.render( 'index', {data:results });
  });
});

app.post('/getJson',function(req,res){
  let number = req.body.numberphone;
  let status = req.body.example;
  let sql = `UPDATE calltable SET status = ? WHERE numberphone = ?`;

  let data = [status, number];

  connectDB.query(sql, data, (error, results, fields) => {
    console.log(results)
    if (error){
      return console.error(error.message);
    } if (results) {
      console.log(1)
      res.redirect('/')
    }
  });
  // connectDB.end();
});
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
