const CategoryService = require('../services/CategoryService');

const createCategory = async (req, res, next) => {
  try {
    const { name } = req.body;
    const result = await CategoryService.createCategory({ name });
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createCategory,
};
