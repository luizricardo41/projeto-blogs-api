const Joi = require('joi');
const badRequest = require('../error/badRequest');

const userSchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  categoryIds: Joi.array().required(),
});

const validationPost = (req, res, next) => {
  const { error } = userSchema.validate(req.body);
  if (error) throw badRequest(error.message);

  next();
};

module.exports = validationPost;