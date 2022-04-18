const Joi = require('joi');
const badRequest = require('../error/badRequest');

const userSchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
});

const validateEditPost = (req, res, next) => {
  const data = req.body;
  if (data.categoryIds) throw badRequest('Categories cannot be edited');
  const { error } = userSchema.validate(req.body);
  if (error) throw badRequest(error.message);

  next();
};

module.exports = validateEditPost;