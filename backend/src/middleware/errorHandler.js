function notFoundHandler(req, res, next) {
  res.status(404).json({ error: 'Not Found' });
}

function errorHandler(err, req, res, next) {
  const status = err.status || 500;
  const message = err.message || 'Server error';

  const response = { error: message };
  if (process.env.NODE_ENV !== 'production') {
    response.details = err.details || undefined;
  }
  res.status(status).json(response);
}

module.exports = { notFoundHandler, errorHandler };
