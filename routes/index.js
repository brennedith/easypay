const express = require('express');

const router = express.Router();

// Landing page
router.get('/', (req, res, next) => {
  res.render('index', { layout: false });
});

router.get('/dashboard', (req, res, next) => {
  const { role } = req.user;

  res.render(`dashboard/${role}`);
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
