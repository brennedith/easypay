const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
  res.render('users/list');
});

router.get('/detail', (req, res, next) => {
  res.render('users/detail');
});

module.exports = router;
