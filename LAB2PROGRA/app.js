var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser=require('body-parser');
const methods = require('./methods');
const mongoose = require('mongoose');
const hbs=require('hbs');



var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var employeeRouter = require('./routes/employees');
var fullTimeRouter = require('./routes/fullTimeEmployees');
var partTimeRouter = require('./routes/partTimeEmployees');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

hbs.registerPartials(__dirname + '/views/partials',function(err){});

app.use(logger('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use((req,res,next)=>{
  const authToken=req.cookies['AuthToken'];
  req.user=methods.authTokens[authToken];
  next();
})

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/employee', employeeRouter);
app.use('/fullTimeEmployee', fullTimeRouter);
app.use('/partTimeEmployee', partTimeRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


mongoose.connect('mongodb://localhost:27017/employees',{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>console.log("Conexion exitosa con mongoDB"))
.catch((e)=>console.log("error al conectar con mongoDB",e))



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
