const express = require('express');
const mongoose = require('mongoose');

const Place = require('../../models/Place');

const { ObjectId } = mongoose.Types;
const router = express.Router();

// Create
router.post('/', (req, res, next) => {
  const { user, name, type, address, longitude, latitude } = req.body;

  Place.create({
    owner: ObjectId(user),
    name,
    type,
    location: {
      address,
      coordinates: [longitude, latitude]
    }
  })
    .then(place => res.send(place))
    .catch(err => console.log(err));
});

// Read
router.get('/', (req, res, next) => {
  Place.find()
    .then(places => res.send(places))
    .catch(err => console.log(err));
});
router.get('/:id', (req, res, next) => {
  const { id } = req.params;

  Place.findById(id)
    .then(place => res.send(place))
    .catch(err => console.log(err));
});

// Update
router.patch('/:id', (req, res, next) => {
  const { id } = req.params;
  const { name, type, address, longitude, latitude } = req.body;

  Place.findByIdAndUpdate(
    id,
    {
      name,
      type,
      location: {
        address,
        coordinates: [longitude, latitude]
      }
    },
    { new: true }
  )
    .then(place => res.send(place))
    .catch(err => console.log(err));
});

// Delete
router.delete('/:id', (req, res, next) => {
  const { id } = req.params;

  Place.findByIdAndDelete(id)
    .then(place => res.send(place))
    .catch(err => console.log(err));
});

module.exports = router;
