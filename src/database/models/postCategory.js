const PostCategory = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define('PostCategory', 
    {
      postId: DataTypes.INTEGER,
      categoryId: DataTypes.INTEGER,
    },
    { timestamps: false },
  );

  PostCategory.associate = (models) => {
    models.Category.belongsToMany(models.BlogPost, { 
      as: 'categoryId',
      through: PostCategory,
      foreignKey: 'categoryId',
      otherKey: 'postId',
    });
    models.BlogPost.belongsToMany(models.Category, {
      as: 'postId',
      through: PostCategory,
      foreignKey: 'postId',
      otherKey: 'categoryId',
    });
  };

  return PostCategory;
}

module.exports = PostCategory;