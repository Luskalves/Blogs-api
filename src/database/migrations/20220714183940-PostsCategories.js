'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
  await queryInterface.createTable('PostsCategories', {
    postId: {
      alloWnull: false,
      type: Sequelize.INTEGER,
      references: {
        model: 'BlogPosts',
        key: 'id'
      },
      categoryId: {
        alloWnull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Categories',
          key: 'id'
      },
    }}
  })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('PostsCategories');
  }
};
