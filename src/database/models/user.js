const User = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  },
  { timestamps: false });

  User.associate = (models) => {
    User.hasMany(models.BlogPost, 
      { foreingKey: 'id', as: 'userId' })
  }
  
  return User;
}

module.exports = User;