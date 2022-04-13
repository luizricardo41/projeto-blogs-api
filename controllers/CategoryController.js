const CategoryService = require('../services/CategoryService');

const createCategory = async (req, res, next) => {
  try {
    const { name } = req.body;
    const result = await CategoryService.createCategory({ name });
    return res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

const getCategories = async (req, res, next) => {
  try {
    const categories = await CategoryService.getCategories();
    return res.status(200).json(categories);
  } catch (err) {
    next(err);
  }  
};

module.exports = {
  createCategory,
  getCategories,
};
