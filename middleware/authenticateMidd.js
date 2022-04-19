const jwt = require('jsonwebtoken');
require('dotenv').config();

const unauthorized = require('../error/unauthorized');

const secret = process.env.JWT_SECRET;

const authenticateMidd = (req, _res, next) => {
  const { authorization } = req.headers;

  if (!authorization) throw unauthorized('Token not found');
  try {
    jwt.verify(authorization, secret);
    next();
  } catch (err) {
    throw unauthorized('Expired or invalid token');
  }
};

module.exports = authenticateMidd;