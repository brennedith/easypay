const express = require('express');

const { hasRole } = require('../../handlers/middlewares');
const Order = require('../../models/Order');
const Payment = require('../../models/Payment');

const router = express.Router();

// Create
router.post('/', (req, res, next) => {
  const { place } = req.user;

  Order.create({
    owner: place
  })
    .then(order => res.send(order))
    .catch(err => console.log(err));
});

// Read
router.get('/', (req, res, next) => {
  const { place } = req.user;
  Order.find({ owner: place })
    .populate('products')
    .populate('payments')
    .then(orders => res.send(orders))
    .catch(err => console.log(err));
});
router.get('/:id', (req, res, next) => {
  const { id } = req.params;

  Order.findById(id)
    .populate('products')
    .populate('payments')
    .then(order => res.send(order))
    .catch(err => console.log(err));
});

// Update
router.put('/:id', (req, res, next) => {
  const { id } = req.params;
  const { product, quantity, price } = req.body;

  Order.findById(id)
    .populate('products')
    .then(order => {
      const { products, productsQty: productsQuantity } = order;
      const productsQty = [...productsQuantity, quantity];
      const productsIds = [...products.map(product => product._id), product];

      const total = [...products, { price }].reduce((acc, product, index) => {
        return acc + product.price * productsQty[index];
      }, 0);

      const currentProductsIds = [...products.map(product => String(product._id))];
      if (currentProductsIds.includes(product)) {
        return res.send(order);
      }

      Order.findByIdAndUpdate(id, { products: productsIds, productsQty, total }, { new: true })
        .populate('products')
        .then(order => res.send(order));
    })
    .catch(err => console.log(err));
});
router.patch('/:id', (req, res, next) => {
  const { id } = req.params;
  const { product, quantity } = req.body;

  Order.findById(id)
    .populate('products')
    .then(order => {
      const { products, productsQty } = order;
      const productsIds = [...products.map(product => String(product._id))];
      const productIndex = productsIds.indexOf(product);

      if (quantity <= 0) {
        products.splice(productIndex, 1);
        productsIds.splice(productIndex, 1);
        productsQty.splice(productIndex, 1);
      } else {
        productsQty[productIndex] = quantity;
      }

      const total = [...products].reduce((acc, product, index) => {
        return acc + product.price * productsQty[index];
      }, 0);

      Order.findByIdAndUpdate(id, { products: productsIds, productsQty, total }, { new: true })
        .populate('products')
        .then(order => res.send(order));
    })
    .catch(err => console.log(err));
});
router.put('/:id/payment', (req, res, next) => {
  const { id } = req.params;
  const payments = Object.values(req.body.taps);

  Payment.create(payments)
    .then(payments => {
      Order.findByIdAndUpdate(id, { payments }, { new: true }).then(order => {
        res.send(payments);
      });
    })
    .catch(err => console.log(err));
});

// Delete
router.delete('/:id', hasRole('admin'), (req, res, next) => {
  const { id } = req.params;

  Order.findByIdAndDelete(id)
    .populate('products')
    .then(order => res.send(order))
    .catch(err => console.log(err));
});

module.exports = router;
