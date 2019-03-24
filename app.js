const createError = require('http-errors');
const express = require('express');
const path = require('path');
// var favicon = require('serve-favicon');
const logger = require('morgan');
const config = require('./config/database');
const passport = require('passport');

// Initiate Express
const app = express();

//
// API HANDLING
//

// Routes for API URLs
const apiRouter = require('./src/app/_routes/api-routes');

// Set headers for API requests
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Origin'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, DELETE, PUT, OPTIONS'
  );
  next();
});

//
// DATABASE CONFIG
//

// Initiate database
const mongoose = require('mongoose');

// Connect to database
mongoose
  .connect(config.database, {
    promiseLibrary: require('bluebird'),
    useNewUrlParser: true
  })
  // Log when connection successful (if in dev environment)
  .then(() => console.log('MongoDB connection successful.'))
  .catch(err => console.error(err));

// Use new method to remove deprecation warning
mongoose.set('useCreateIndex', true);

//
// EXPRESS
//
require('./config/passport');
app.use(passport.initialize());
app.use(logger('dev'));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false
  })
);

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
app.use(function(req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function(err, req, res) {
  // Set locals, and only send errors in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render error page
  res.status(err.status || 500);
  res.sendStatus(err.status);
});

module.exports = app;
