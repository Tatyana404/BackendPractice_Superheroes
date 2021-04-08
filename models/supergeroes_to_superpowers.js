'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Supergeroes_to_superpowers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
    }
  }
  Supergeroes_to_superpowers.init(
    {
      supergeroId: {
        field: 'supergero_id',
        type: DataTypes.INTEGER,
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
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'superpower',
          key: 'id',
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
      },
    },
    {
      sequelize,
      modelName: 'Supergeroes_to_superpowers',
    }
  );
  return Supergeroes_to_superpowers;
};

edfedf