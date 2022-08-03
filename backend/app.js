/******** Imported Packages ********/
const express = require('express');
require('express-async-errors');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
// Indicates if the environment is in production or not
const { environment } = require('./config');
const isProduction = environment === 'production';
// Initialize the Express application
const app = express();
// Adds routes to the express application
const routes = require('./routes');

const { ValidationError } = require('sequelize');

/******** Middleware ********/
// Connects the morgan middleware for logging information about requests and responses
app.use(morgan('dev'));
// Middleware for parsing cookies
app.use(cookieParser());
// Middleware for parsing JSON bodies of requests with Content-Type of "application/json"
app.use(express.json());

/******** Security Middleware ********/

if (!isProduction) {
  app.use(cors());
}

// helmet helps set a variety of headers to better secure the app
app.use(
  helmet.crossOriginResourcePolicy({
    policy: "cross-origin"
  })
);
// set the _csrf token and create req.csrfToken method
app.use(
  csurf({
    cookie: {
      secure: isProduction,
      sameSite: isProduction && "Lax",
      httpOnly: true
    }
  })
);

// Middleware that connects all the routes
app.use(routes)

/******** Error Handlers ********/
// Catch unhandled requests and forward to error handler.
app.use((_req, _res, next) => {
  const err = new Error("The requested resource couldn't be found.");
  err.title = "Resource Not Found";
  err.errors = ["The requested resource couldn't be found."];
  err.status = 404;
  next(err)
})

// Process Sequelize Errors
app.use((err, _req, _res, next) => {
  if (err instanceof ValidationError) {
    err.errors = err.errors.map((e) => e.message);
    err.title = 'Validation error';
  }
  next(err);
})

// app.use((err, req, res, next) => {
//   if (err.title === 'Login failed') {
//     res.status(401)
//     res.json({
//       "message": "Invalid Credentials",
//       "statusCode": 401
//     })
//   }
//   next(err)
// })

// app.use((err, req, res, next) => {
//   if (err.title === 'Validation Error') {
//     res.status(err.status || 400)
//     res.json({
//       message: err.message,
//       statusCode: err.status,
//       errors: err.errors
//     })
//   }
//   next(err)
// })

// Error formatter
app.use((err, _req, res, _next) => {
  res.status(err.status || 500);
  console.log(err);
  res.json({
    title: err.title || 'Server Error',
    message: err.message,
    errors: err.errors,
    stack: isProduction ? null : err.stack
  });
});

module.exports = app;