const BlogPost = (sequelize, DataTypes) => {
  const BlogPost = sequelize.define('BlogPost', {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    published: DataTypes.DATE,
    updated: DataTypes.DATE,
    userId: { type: DataTypes.INTEGER, foreignKey: true }
  },
  { timestamps: false });

  BlogPost.associate = (models) => {
    BlogPost.belongsTo(models.User, 
      { foreignKey: 'userId' });
  };

  // BlogPost.associate = (models) => {
  //   BlogPost.hasMany(models.PostCategory, 
  //     { foreignKey: 'id' });
  // };
  
  return BlogPost;
};

module.exports = BlogPost;