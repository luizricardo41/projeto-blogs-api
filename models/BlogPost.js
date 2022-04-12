const BlogPost = (sequelize, DataTypes) => {
  const BlogPosts = sequelize.define('BlogPost', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    published: DataTypes.DATE,
    updateAt: DataTypes.DATE,
    userId: { type: DataTypes.INTEGER, foreignKey: true },
  }, {
    createdAt: 'published',
    updatedAt: 'updated', 
  });

  BlogPost.associate = (models) => {
    BlogPost.belongsTo(models.User,
      { foreignKey: 'userId', as: 'users' });
  };

  return BlogPosts;
};

module.exports = BlogPost;