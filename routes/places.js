const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
  res.render('places/index', {
    title: 'Places'
  });
});

router.get('/:id', (req, res, next) => {
  const { id } = req.params;

  res.render('products/index', {
    title: `Place id: ${id}`,
    id
  });
});

module.exports = router;
