const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
  res.render('orders/list');
});

router.get('/detail', (req, res, next) => {
  res.render('orders/detail');
});

module.exports = router;
