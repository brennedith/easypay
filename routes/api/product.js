const express = require('express');

const router = express.Router();

const Product = require('../../models/Product');

// Create

// Read
router.get('/', (req, res, next) => {
  Product.find()
    .then(products => res.send(products))
    .catch(err => console.log(err));
});
router.get('/:id', (req, res, next) => {
  const { id } = req.params;

  Product.findById(id)
    .then(product => res.send(product))
    .catch(err => console.log(err));
});

// Update

// Delete

module.exports = router;
