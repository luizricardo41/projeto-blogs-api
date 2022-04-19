const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
const badRequest = require('../error/badRequest');
const notFound = require('../error/notFound');
const unauthorized = require('../error/unauthorized');

require('dotenv').config();

const { BlogPost, Category, User } = require('../models');

const secret = process.env.JWT_SECRET;

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

  if (!result) throw notFound('Post does not exist');
  return result;
};

const editPost = async ({ id, title, content }, authorization) => {
  const user = jwt.verify(authorization, secret);
  if (user.data !== Number(id)) throw unauthorized('Unauthorized user');
  await BlogPost.update({ title, content }, { where: { id } });

  const result = await BlogPost.findByPk(id, {
    include: [{
        model: Category,
        as: 'categories',
        through: { attributes: [] },
      }],
  });
  return result;
};

const deletePost = async (id, authorization) => {
  const post = await BlogPost.findByPk(id);
  if (!post) throw notFound('Post does not exist');
  
  const user = jwt.verify(authorization, secret);
  if (user.data !== Number(id)) throw unauthorized('Unauthorized user');
  
  await BlogPost.destroy({ where: { id } });
};

const searchTerm = async (query) => {
  if (!query) {
    const allPosts = await BlogPost.findAll({
      include: [{ model: User, as: 'user' },
        { model: Category, as: 'categories', through: { attributes: [] },    
      }] });
    return allPosts;
  }
  const post = await BlogPost.findAll(
    {
      where: { [Op.or]: [{ title: query }, { content: query }] },
      include: [{ model: User, as: 'user' },
      { model: Category, as: 'categories', through: { attributes: [] } }],
    },
  );

  return post;
};

module.exports = {
  createPost,
  getPosts,
  getPostById,
  editPost,
  deletePost,
  searchTerm,
};