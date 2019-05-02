const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
  res.render('orders/list', {
    title: 'Orders'
  });
});

router.get('/:id', (req, res, next) => {
  const { id } = req.params;

  res.render('orders/detail', {
    title: `Order id: ${id}`,
    id
  });
});

router.get('/:id/checkout', (req, res, next) => {
  const { id } = req.params;

  res.render('orders/checkout', {
    title: `Checkout of order id: ${id}`,
    id
  });
});

module.exports = router;
