require('dotenv').config()
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose= require("mongoose");
const mongoDB=process.env.MONGODB_URL||"mongodb+srv://itssagar11:0135india@cluster0.4yxhpzs.mongodb.net/library?retryWrites=true&w=majority://localhost:27017/mongodb+srv://itssagar11:0135Indi@@cluster0.mdd4cvd.mongodb.net/?libraryretryWrites=true";
const passport=require("passport");
const JWTStrategy=require("passport-jwt").Strategy; 
const {ExtractJwt}=require("passport-jwt");
const auth= require("./routes/auth")




mongoose.connect(mongoDB,{ useNewUrlParser: true, w: "majority" })
.then((res)=>{
  console.log("connected to database")
})
.catch((err)=>{console.log(err)});


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var catalogRouter= require("./routes/catalog");
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
 
app.use("/catalog",catalogRouter);
app.use('/auth',auth);
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
