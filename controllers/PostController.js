const PostService = require('../services/PostService');

const createPost = async (req, res, next) => {
  try {
    const newPost = req.body;
    const { authorization } = req.headers;
    const result = await PostService.createPost(newPost, authorization);
    return res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createPost,
};