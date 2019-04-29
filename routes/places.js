const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
  res.render('places/list');
});

router.get('/detail', (req, res, next) => {
  res.render('places/detail');
});

module.exports = router;
