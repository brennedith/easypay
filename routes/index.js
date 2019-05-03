const express = require('express');

const router = express.Router();

// Landing page
router.get('/', (req, res, next) => {
  res.render('index', {
    layout: false,
    title: 'EasyPay'
  });
});

router.get('/dashboard', (req, res, next) => {
  const { role } = req.user;

  res.render(`dashboard/${role}`, {
    title: 'Dashboard'
  });
});

// Payment successful
router.get('/thanks', (req, res, next) => {
  res.render('thanks', { layout: false });
});

// 404
router.get('/not-found', (req, res, next) => {
  res.render('not-found');
});

// Error page
router.get('/working-on-it', (req, res, next) => {
  res.render('working-on-it');
});

module.exports = router;
