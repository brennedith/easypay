const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
  res.render('places/index');
});

module.exports = router;
