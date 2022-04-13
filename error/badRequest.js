const badRequest = (message) => ({
  message,
  statusCode: 400,
  stack: Error().stack,
});

module.exports = badRequest;