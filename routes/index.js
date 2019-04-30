const express = require('express');

const router = express.Router();

// Landing page
router.get('/', (req, res, next) => {
  res.send('Home page');
});

router.get('/dashboard', (req, res, next) => {
  res.send('Dashboard');
});

// 404
router.get('/not-found', (req, res, next) => {
  res.send('That page does not exists');
});

// Error page
router.get('/working-on-it', (req, res, next) => {
  res.send('Something went wrong. :(');
});

module.exports = router;
