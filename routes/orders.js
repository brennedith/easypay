const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
  res.render('orders/list');
});

router.get('/detail/:id', (req, res, next) => {
  const { id } = req.params;

  res.render('orders/detail', { id });
});

router.get('/:id/checkout', (req, res, next) => {
  const { id } = req.params;

  res.render('orders/checkout', { id });
});

module.exports = router;
