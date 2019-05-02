const express = require('express');

const router = express.Router();

router.get('/:id', (req, res, next) => {
  const { id } = req.params;

  res.render('payments/index', {
    title: 'Payment',
    id,
    paypalId: process.env.PAYPAL_ID
  });
});

module.exports = router;
