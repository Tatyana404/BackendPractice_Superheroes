'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('supergeroes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      nickName: {
        field: 'nick_name',
        unique: true,
        allowNull: false,
        type: Sequelize.STRING(128),
      },
      realName: {
        field: 'real_name',
        unique: true,
        type: Sequelize.STRING(128),
      },
      originDescription: {
        field: 'origin_description',
        unique: true,
        type: Sequelize.STRING(500),
      },
      catchPhrase: {
        field: 'catch_phrase',
        unique: true,
        type: Sequelize.STRING,
      },
      createdAt: {
        field: 'created_at',
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        field: 'updated_at',
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('supergeroes');
  },
};
