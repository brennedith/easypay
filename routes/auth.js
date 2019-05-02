const express = require('express');
const passport = require('passport');

const User = require('../models/User');

const router = express.Router();

router.get('/register', (req, res, next) => {
  res.render('auth/form', {
    title: 'Register',
    new: true,
    form: {
      title: 'Welcome',
      action: '/register',
      button: 'Create my account'
    }
  });
});
router.post('/register', (req, res, next) => {
  const { email, password } = req.body;

  const user = {
    email,
    role: 'admin'
  };

  // Registers the user
  User.register(user, password).then(user => {
    // Auth
    req.logIn(user, err => {
      if (err) return next(err);

      res.redirect('/dashboard');
    });
  });
});

router.get('/login', (req, res, next) => {
  res.render('auth/form', {
    title: 'Login',
    form: {
      title: 'Welcome back',
      action: '/login',
      button: 'Login'
    }
  });
});
router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/login'
  })
);

// TODO:
router.post('/reset-password', (req, res, next) => {});
router.post('/reset-password', (req, res, next) => {});

module.exports = router;
