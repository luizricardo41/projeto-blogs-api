const Joi = require('joi');
const verifyParams = require('../error/verifyParams');

const userSchema = Joi.object({
  displayName: Joi.string().min(8),
  email: Joi.string().email().required(),
  password: Joi.string().length(6).required(),
  image: Joi.string(),
});

const validationUser = (req, res, next) => {
  const { error } = userSchema.validate(req.body);
  if (error) throw verifyParams(error.message);
  next();
};

module.exports = validationUser;