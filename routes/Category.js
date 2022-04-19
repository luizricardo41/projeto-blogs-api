const express = require('express');

const CategoryController = require('../controllers/CategoryController');
const authenticateMidd = require('../middleware/authenticateMidd');

const router = express.Router();

router.get('/', authenticateMidd, CategoryController.getCategories);

router.post('/', authenticateMidd, CategoryController.createCategory);

module.exports = router;