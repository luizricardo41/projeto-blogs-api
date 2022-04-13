const Joi = require('joi');
const badRequest = require('../error/badRequest');

const userSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().length(6).required(),
});

const validationLogin = (req, res, next) => {
  const { error } = userSchema.validate(req.body);
  if (error) throw badRequest(error.message);
  next();
};

module.exports = validationLogin;