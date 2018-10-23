var createError = require('http-errors');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');

// Initiate Express
var app = express();

//
// API HANDLING
//

// Routes for API URLs
var apiRouter = require('./routes/api-routes');

// Set headers for API requests
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Origin");
  res.setHeader("Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, PUT, OPTIONS");
  next();
});

//
// DATABASE CONFIG
//

// Initiate database
var mongoose = require('mongoose');

//Connect to database
mongoose.connect('mongodb://localhost/crnl-app', {
  promiseLibrary: require('bluebird'),
  useNewUrlParser: true
})
// Log when connection successful (if in dev environment)
.then(() => console.log('MongoDB connection successful.'))
.catch((err) => console.error(err));

// Use new method to remove deprecation warning
mongoose.set('useCreateIndex', true);

//
// EXPRESS
//

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));

// Tell express where to look for angular files
app.use(express.static(path.join(__dirname, 'dist/crnl-app')));

// Use angular for routing
app.use('/', express.static(path.join(__dirname, 'dist/crnl-app')));

// Configure API routes
app.use('/api', apiRouter);


//
// ERROR HANDLING
//

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function (err, req, res, next) {
  // Set locals, and only send errors in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render error page
  res.status(err.status || 500);
  res.sendStatus(err.status);
});

module.exports = app;