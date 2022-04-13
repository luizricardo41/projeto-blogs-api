const UserService = require('../services/UserService');

const createUser = async (req, res, next) => {
  try {
    const newUser = req.body;
    const result = await UserService.createUser(newUser);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

const getUsers = async (_req, res, next) => {
  try {
    const users = await UserService.getUsers();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await UserService.getUserById(id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
};