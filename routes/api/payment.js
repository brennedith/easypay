const express = require('express');

const Payment = require('../../models/Payment');

const router = express.Router();

// Read
router.get('/:id', (req, res, next) => {
  const { id } = req.params;

  Payment.findById(id)
    .populate('products')
    .then(payment => res.send(payment))
    .catch(err => console.log(err));
});

// Update
router.patch('/:id', (req, res, next) => {
  const { id } = req.params;
  const { orderId } = req.body;

  Payment.findByIdAndUpdate(id, { complete: true, orderId })
    .then(payment => res.send(payment))
    .catch(err => console.log(err));
});

module.exports = router;
