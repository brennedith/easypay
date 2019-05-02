const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
  res.render('users/index', {
    title: 'Users'
  });
});

module.exports = router;
