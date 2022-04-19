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

const editPost = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const { id } = req.params;
    const { title, content } = req.body;
    const result = await PostService.editPost({ id, title, content }, authorization);
    return res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

const deletePost = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const { id } = req.params;
    await PostService.deletePost(id, authorization);
    return res.status(204).json();
  } catch (err) {
    next(err);
  }
};

const searchTerm = async (req, res, next) => {
  try {
    const { q } = req.query;
    const result = await PostService.searchTerm(q);
    return res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createPost,
  getPosts,
  getPostById,
  editPost,
  deletePost,
  searchTerm,
};