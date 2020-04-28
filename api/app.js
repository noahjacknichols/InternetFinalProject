var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors");
var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
var getUsersRouter = require("./routes/getUsers");
var isUserRouter = require("./routes/isUser");
var getAptRouter = require("./routes/getApts");
var insertApt = require("./routes/insertApt");
var removeApt = require("./routes/removeApt");
var app = express();
// var con = require("./conn")

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// ADD ROUTES HERE
app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use('/getUsers', getUsersRouter);
app.use('/isUser', isUserRouter);
app.use('/getApts', getAptRouter);
app.use('/insertApt', insertApt);
app.use('/removeApt', removeApt);

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
