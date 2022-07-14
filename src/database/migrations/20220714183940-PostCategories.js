'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
     queryInterface.createTable('PostCategories', {
    postId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: 'BlogPosts',
        key: 'id'
      },
    },
    categoryId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: 'Categories',
        key: 'id'
    }
  },
  })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('PostCategories');
  }
};
