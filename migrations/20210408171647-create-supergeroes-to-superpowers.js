'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('supergeroes_to_superpowers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      supergeroId: {
        field: 'supergero_id',
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'supergeroes',
          key: 'id',
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
      },
      superpowerId: {
        field: 'superpower_id',
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'superpower',
          key: 'id',
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('supergeroes_to_superpowers');
  },
};
