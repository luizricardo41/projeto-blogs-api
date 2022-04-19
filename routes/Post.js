const express = require('express');

const PostController = require('../controllers/PostController');
const authenticateMidd = require('../middleware/authenticateMidd');
const validationPost = require('../middleware/validationPost');
const validateEditPost = require('../middleware/validateEditPost');

const router = express.Router();

router.post('/', authenticateMidd, validationPost, PostController.createPost);

router.get('/', authenticateMidd, PostController.getPosts);

router.get('/search', authenticateMidd, PostController.searchTerm);

router.get('/:id', authenticateMidd, PostController.getPostById);

router.put('/:id', authenticateMidd, validateEditPost, PostController.editPost);

router.delete('/:id', authenticateMidd, PostController.deletePost);

module.exports = router;