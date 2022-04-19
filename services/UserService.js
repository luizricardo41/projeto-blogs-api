const jwt = require('jsonwebtoken');
const conflict = require('../error/conflict');
const notFound = require('../error/notFound');
const { User } = require('../models');

const secret = process.env.JWT_SECRET;

const createUser = async (user) => {
  const { email } = user;
  const getUser = await User.findOne({ where: { email } });

  if (getUser) throw conflict('User already registered');
  
  const { id } = await User.create(user);

  const jwtConfig = {
    expiresIn: '20m',
    algorithm: 'HS256',
  };

  const token = jwt.sign({ data: id }, secret, jwtConfig);
  return { token };
};

const getUsers = async () => {
  const users = await User.findAll();

  return users;
};

const getUserById = async (id) => {
  const user = await User.findByPk(id);

  if (!user) throw notFound('User does not exist');

  return user;
};

const deleteUser = async (authorization) => {
  const user = jwt.verify(authorization, secret);
  const userDelete = await User.findByPk(user.data);
  
  if (!userDelete) throw notFound('User not found');
  await User.destroy({ where: { id: user.data } });
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  deleteUser,
};