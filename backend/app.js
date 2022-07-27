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

module.exports = app;