const jwt = require('jsonwebtoken');
const badRequest = require('../error/badRequest');
const notFound = require('../error/notFound');

require('dotenv').config();

const { BlogPost, Category, User } = require('../models');

const secret = process.env.SECRET || 'mysecretkey';

const createPost = async (post, authorization) => {
  const { title, content, categoryIds } = post;
  
  await Promise.all(categoryIds.map(async (id) => {
    const category = await Category.findByPk(id); 
    if (!category) throw badRequest('"categoryIds" not found');
  }));
  
  const user = jwt.verify(authorization, secret);
  const newPost = { userId: user.data, title, content };
  
  const addNewPost = await BlogPost.create(newPost);
  const categories = await Category.findAll(
    { where: { id: categoryIds } },
  );
  await addNewPost.addCategories(categories);
  return addNewPost;
};

const getPosts = async () => {
  const result = await BlogPost.findAll({
    include: [{ model: User, as: 'user' },
      {
        model: Category,
        as: 'categories',
        through: { attributes: [] },    
    }],
  });
  return result;
};

const getPostById = async (id) => {
  const result = await BlogPost.findByPk(id, {
    include: [{ model: User, as: 'user' },
      {
        model: Category,
        as: 'categories',
        through: { attributes: [] },
      }],
  });
  console.log(result);
  if (!result) throw notFound('Post does not exist');
  return result;
};

module.exports = {
  createPost,
  getPosts,
  getPostById,
};