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

module.exports = {
  createUser,
};