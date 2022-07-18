const PostCategory = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define('PostCategory', 
    {
      postId: { type: DataTypes.INTEGER, foreignKey: true },
      categoryId: { type: DataTypes.INTEGER, foreignKey: true },
    },
    { timestamps: false },
  );

  PostCategory.associate = (models) => {
    models.Category.belongsToMany(models.BlogPost, { 
      as: 'categoryId',
      through: PostCategory,
      foreignKey: 'id',
      otherKey: 'postId',
    });
    models.BlogPost.belongsToMany(models.Category, {
      as: 'postId',
      through: PostCategory,
      foreignKey: 'id',
      otherKey: 'categoryId',
    })
  };

  return PostCategory;
}

module.exports = PostCategory;