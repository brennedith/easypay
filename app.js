require('dotenv').config();

const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const logger = require('morgan');

const passport = require('./handlers/passport');
const { isLogged, hasRole, notFound, handleError } = require('./handlers/middlewares');

// Database configuration
mongoose
  .connect(process.env.DBURL, { useNewUrlParser: true })
  .then(() => console.log('The DB connection was establish.'))
  .catch(err => {
    console.log('Error while establishing a connection.');
    throw new Error(err);
  });

// Configure database sessions
const store = new MongoDBStore({
  uri: process.env.DBURL,
  collection: 'local-sessions'
});
store.on('error', error => {
  console.log(error);
});

const app = express();

// Auth express configuration
app.use(
  session({
    secret: process.env.SECRET,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7 // 1 Week
    },
    store,
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

// View routes
app.use('/', require('./routes/index'));
app.use('/', require('./routes/auth'));
app.use('/users', isLogged, hasRole('admin'), require('./routes/users'));
app.use('/places', isLogged, hasRole('admin'), require('./routes/places'));
app.use('/orders', isLogged, hasRole('user'), require('./routes/orders'));
app.use('/payments', require('./routes/payments'));

// API routes
app.use('/api/user', isLogged, hasRole('admin'), require('./routes/api/user'));
app.use('/api/place', isLogged, hasRole('admin'), require('./routes/api/place'));
app.use('/api/product', isLogged, require('./routes/api/product'));
app.use('/api/order', isLogged, require('./routes/api/order'));
app.use('/api/payment', require('./routes/api/payment'));

// Route middlewares
app.use(notFound);
app.use(handleError);

// Starts the server
app.listen(process.env.PORT, () => {
  console.log(`App is running on port ${process.env.PORT}`);
});
