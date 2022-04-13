const conflict = (message) => ({
  message,
  statusCode: 409,
  stack: Error().stack,
});

module.exports = conflict;