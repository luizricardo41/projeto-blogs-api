const verifyParams = (message) => ({
  message,
  statusCode: 400,
  stack: Error().stack,
});

module.exports = verifyParams;