const express = require('express');
const multer = require('multer');

const Place = require('../../models/Place');
const User = require('../../models/User');

const upload = multer({ dest: './public/images/avatars' });
const router = express.Router();

// Create
router.post('/', upload.single('image'), (req, res, next) => {
  const { email, name, role, place, password } = req.body;

  User.register(
    {
      email,
      name,
      photoURL: `/images/avatars/${req.file.filename}`,
      place,
      role
    },
    password
  )
    .then(user => res.send(user))
    .catch(err => console.log(err));
});

// Read
router.get('/', (req, res, next) => {
  const { _id: owner } = req.user;

  Place.find({ owner })
    .then(places => {
      const placesIds = places.map(place => place._id);

      User.find({ place: { $in: placesIds } })
        .populate('place')
        .then(users => res.send(users));
    })
    .catch(err => console.log(err));
});
router.get('/:id', (req, res, next) => {
  const { id } = req.params;

  User.findById(id)
    .populate('place')
    .then(user => res.send(user))
    .catch(err => console.log(err));
});

// Update
router.patch('/:id', upload.single('image'), (req, res, next) => {
  const { id } = req.params;
  const { email, name, role, photoURL, password } = req.body;

  if (password) {
    User.findById(id)
      .then(user => user.setPassword(password))
      .catch(err => console.log(err));
  }

  User.findByIdAndUpdate(
    id,
    {
      email,
      name,
      role,
      photoURL: req.file ? `/images/avatars/${req.file.filename}` : photoURL
    },
    { new: true }
  )
    .then(user => res.send(user))
    .catch(err => console.log(err));
});

// Delete
router.delete('/:id', (req, res, next) => {
  const { id } = req.params;

  User.findByIdAndDelete(id)
    .then(user => res.send(user))
    .catch(err => console.log(err));
});

module.exports = router;
