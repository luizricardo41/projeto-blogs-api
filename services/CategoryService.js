const badRequest = require('../error/badRequest');
const { Category } = require('../models');

const createCategory = async (category) => {
  const { name } = category;

  if (!name) throw badRequest('"name" is required');
  const { id } = await Category.create(category);
  
  return {
    id,
    name,
  };
};

module.exports = {
  createCategory,
};