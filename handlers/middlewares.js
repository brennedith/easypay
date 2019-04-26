exports.notFound = (req, res, next) => {
  res.redirect('/not-found');
};

exports.handleError = (err, req, res, next) => {
  console.log('ERROR', req.method, req.path, err);

  res.redirect('/working-on-it');
};
