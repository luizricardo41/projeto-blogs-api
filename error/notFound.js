const notFound = (message) => ({
    message,
    statusCode: 404,
    stack: Error().stack,
});
  
module.exports = notFound;
