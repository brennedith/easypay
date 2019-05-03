exports.notFound = (req, res, next) => {
  res.redirect('/not-found');
};

exports.handleError = (err, req, res, next) => {
  console.log('ERROR', req.method, req.path, err);

  res.redirect('/working-on-it');
};

/* Authentication */
exports.isLogged = (req, res, next) => {
  if (!req.user) return res.redirect('/login');

  next();
};

exports.hasRole = role => {
  return (req, res, next) => {
    if (req.user.role !== role) return res.redirect('/not-found');

    next();
  };
};
