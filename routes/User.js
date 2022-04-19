const express = require('express');

const UserController = require('../controllers/UserController');
const authenticateMidd = require('../middleware/authenticateMidd');
const validationUser = require('../middleware/validationUser');

const router = express.Router();

router.get('/', authenticateMidd, UserController.getUsers);

router.get('/:id', authenticateMidd, UserController.getUserById);

router.post('/', validationUser, UserController.createUser);

router.delete('/me', authenticateMidd, UserController.deleteUser);

module.exports = router;