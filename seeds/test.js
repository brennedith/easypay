require('dotenv').config();

const mongoose = require('mongoose');

const User = require('../models/User');
const Place = require('../models/Place');
const Product = require('../models/Product');

// Database configuration
mongoose
  .connect(process.env.DBURL, { useNewUrlParser: true })
  .then(() => console.log('The DB connection was establish.'))
  .catch(err => {
    console.log('Error while establishing a connection.');
    throw new Error(err);
  });

User.register(
  {
    email: 'user@mail.com',
    name: 'Test User',
    role: 'admin'
  },
  'test' // password
)
  .then(user => {
    console.log('Test admin user was created.');

    Place.create({
      owner: user._id,
      name: 'Casa de Toño',
      type: 'Restaurant',
      location: {
        address: 'Tonala 10, Roma Norte, CDMX',
        coordinates: [-99.33453, 22.23432]
      }
    }).then(place => {
      console.log('Test place was created.');

      ['Chilaquiles', 'Tacos', 'Enchiladas', 'Tortas', 'Quesadillas', 'Pozole'].map(plate => {
        Product.create({
          owner: place._id,
          name: plate,
          price: Math.random() * 100
        }).then(product => {
          console.log(`Test product ${plate} was created.`);

          mongoose.connection.close();
        });
      });
    });
  })
  .catch(err => console.log(err));
