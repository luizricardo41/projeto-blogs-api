const Joi = require('joi');
const badRequest = require('../error/badRequest');

const userSchema = Joi.object({
  displayName: Joi.string().min(8),
  email: Joi.string().email().required(),
  password: Joi.string().length(6).required(),
  image: Joi.string(),
});

const validationUser = (req, res, next) => {
  const { error } = userSchema.validate(req.body);
  if (error) throw badRequest(error.message);
  next();
};

module.exports = validationUser;