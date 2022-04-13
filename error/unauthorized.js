const unauthorized = (message) => ({
  message,
  statusCode: 401,
  stack: Error().stack,
});

module.exports = unauthorized;