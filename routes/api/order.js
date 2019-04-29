const express = require('express');
const mongoose = require('mongoose');

const { ObjectId } = mongoose.Types;
const router = express.Router();

const Order = require('../../models/Order');

// Create
router.post('/', (req, res, next) => {
  const { user } = req.body;

  Order.create({
    owner: ObjectId(user)
  })
    .then(order => res.send(order))
    .catch(err => console.log(err));
});

// Read
router.get('/', (req, res, next) => {
  Order.find()
    .populate('products')
    .then(orders => res.send(orders))
    .catch(err => console.log(err));
});
router.get('/:id', (req, res, next) => {
  const { id } = req.params;

  Order.findById(id)
    .populate('products')
    .then(order => res.send(order))
    .catch(err => console.log(err));
});

// Update
router.put('/:id', (req, res, next) => {
  const { id } = req.params;
  const { product, quantity } = req.body;

  Order.findById(id)
    .then(order => {
      const products = [...order.products, ObjectId(product)];
      const productsQty = [...order.productsQty, quantity];

      Order.findByIdAndUpdate(id, { products, productsQty }, { new: true }).then(order => {
        res.send(order);
      });
    })
    .catch(err => console.log(err));
});
router.patch('/:id', (req, res, next) => {
  const { id } = req.params;
  const { product, quantity } = req.body;

  Order.findById(id)
    .then(order => {
      const { products, productsQty } = order;
      const productIndex = order.products.indexOf(product);

      if (quantity === 0) {
        products.splice(productIndex, 1);
        productsQty.splice(productIndex, 1);
      } else {
        productsQty[productIndex] = quantity;
      }

      Order.findByIdAndUpdate(id, { products, productsQty }, { new: true }).then(order => {
        res.send(order);
      });
    })
    .catch(err => console.log(err));
});

// Delete
router.delete('/:id', (req, res, next) => {
  const { id } = req.params;

  Order.findByIdAndDelete(id)
    .then(order => {
      res.send(order);
    })
    .catch(err => console.log(err));
});

module.exports = router;
