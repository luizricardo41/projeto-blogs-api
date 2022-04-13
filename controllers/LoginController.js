const LoginService = require('../services/LoginService');

const login = async (req, res, next) => {
  try {
    const newLogin = req.body;
    const result = await LoginService.login(newLogin); 
    return res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  login,
};