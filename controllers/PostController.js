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

const getPosts = async (_req, res, next) => {
  try {
    const result = await PostService.getPosts();
    return res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

const getPostById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await PostService.getPostById(id);
    return res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createPost,
  getPosts,
  getPostById,
};