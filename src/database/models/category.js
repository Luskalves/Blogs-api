const Category = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    name: DataTypes.STRING,
  },
  { timestamps: false });

  // Category.associate = (models) => {
  //   Category.hasMany(models.PostCategory, 
  //     { foreignKey: 'id', as: 'categoryId' });
  // };
  
  return Category;
}

module.exports = Category;