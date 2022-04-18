const middlewareError = (err, _req, res, _next) => {
  if (err.statusCode) {
    return res.status(err.statusCode).json({ message: err.message });
  }
  console.log(err.stack);
  console.log(err.message);
  return res.status(500).json({ message: 'Server Error' });
};

module.exports = middlewareError;