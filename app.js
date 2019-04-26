require('dotenv').config();

const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const logger = require('morgan');

const passport = require('./handlers/passport');
const md = require('./handlers/middlewares');

// Database configuration
mongoose
  .connect(process.env.DBURL, { useNewUrlParser: true })
  .then(() => console.log('The DB connection was establish.'))
  .catch(err => {
    console.log('Error while establishing a connection.');
    throw new Error(err);
  });

const app = express();

// Auth express configuration
app.use(
  session({
    secret: process.env.SECRET,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7 // 1 Week
    },
    resave: true,
    saveUninitialized: false
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());

// Assets express configuration
app.use(express.static(`${__dirname}/public`));
app.set('view engine', 'hbs');
app.set('views', `${__dirname}/views`);

// Logs file transfers
app.use(logger('dev'));

// Register routes
app.use('/', require('./routes/index'));
app.use('/', require('./routes/auth'));

// Route middlewares
app.use(md.notFound);
app.use(md.handleError);

// Starts the server
app.listen(process.env.PORT, () => {
  console.log(`App is running on port ${process.env.PORT}`);
});
