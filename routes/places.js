const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
  res.render('places/index');
});

router.get('/:id', (req, res, next) => {
  const { id } = req.params;

  res.render('products/index', { id });
});

module.exports = router;
