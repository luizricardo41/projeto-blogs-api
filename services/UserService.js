const jwt = require('jsonwebtoken');
const conflict = require('../error/conflict');
const { User } = require('../models');

const secret = process.env.SECRET || 'mysecretkey';

const createUser = async (user) => {
  const { email } = user;
  const getUser = await User.findOne({ where: { email } });

  if (getUser) throw conflict('User already registered');
  
  await User.create(user);
  
  const jwtConfig = {
    expiresIn: '20m',
    algorithm: 'HS256',
  };

  const token = jwt.sign({ data: email }, secret, jwtConfig);
  return { token };
};

module.exports = {
  createUser,
};