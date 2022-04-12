const PostCategory = (sequelize, _Datatypes) => {
  const PostCategories = sequelize.define('PostCategory',
    {},
    { timestamps: false });
  
  PostCategories.associate = (models) => {
    models.Category.belongsToMany(models.BlogPost, {
      as: 'posts',
      through: PostCategories,
      foreignKey: 'categoryId',
      otherKey: 'postId',
    });
    models.BlogPost.belongsToMany(models.Category, {
      as: 'categories',
      through: PostCategories,
      foreignKey: 'postId',
      otherKey: 'categoryId',
    });
  };

  return PostCategories;
};

module.exports = PostCategory;