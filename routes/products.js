const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
  res.render('products/list');
});

router.get('/detail', (req, res, next) => {
  res.render('products/detail');
});

module.exports = router;
