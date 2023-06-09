// dependencies
const express = require('express');
const morgan = require('morgan')
const { logs } = require('./config/vars');
const bodyParser = require('body-parser');
const compress = require('compression');
const methodOverride = require('method-override');
const helmet = require('helmet');
const cors = require('cors');
const passport = require('passport');
const strategies = require('./config/passport');
const routes = require('./routes');
const error = require('./middlewares/error');



// express instance
const app = express();


// request logging. dev: console | production: file
app.use(morgan(logs))

// parse body params and attache them to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// gzip compression
app.use(compress());


// lets you use HTTP verbs such as PUT or DELETE
// in places where the client doesn't support it
app.use(methodOverride());

// secure apps by setting various HTTP headers
app.use(helmet());


// enable CORS - Cross Origin Resource Sharing
app.use(cors());


// enable authentication
app.use(passport.initialize());
passport.use('jwt', strategies.jwt);
passport.use('facebook', strategies.facebook);
passport.use('google', strategies.google);

// mount api v1 routes
app.use('/v1', routes);



// if error is not an instanceOf APIError, convert it.
app.use(error.converter);


// catch 404 and forward to error handler
app.use(error.notFound);


// error handler, send stacktrace only during development
app.use(error.handler);


module.exports = app;
