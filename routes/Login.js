const express = require('express');

const LoginController = require('../controllers/LoginController');
const validationLogin = require('../middleware/validateLogin');

const router = express.Router();

router.post('/', validationLogin, LoginController.login);

module.exports = router;