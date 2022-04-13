const jwt = require('jsonwebtoken');

const badRequest = require('../error/badRequest');
const { User } = require('../models');

require('dotenv').config();

const secret = process.env.SECRET || 'mysecretkey';

const login = async (user) => {
  const { email } = user;
  const searchUser = await User.findOne({ where: { email } });
  if (!searchUser) throw badRequest('Invalid fields');

  const jwtConfig = {
    expiresIn: '15m',
    algorithm: 'HS256',
  };

  const token = jwt.sign({ data: email }, secret, jwtConfig);
  return { token };
};

module.exports = {
  login,
};