'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Superpowers extends Model {
    static associate (models) {
      Superpowers.belongsToMany(models.Supergeroes, {
        through: 'supergeroes_to_superpowers',
        foreignKey: 'superpowerId',
      });
    }
  }
  Superpowers.init(
    {
      powerName: {
        field: 'power_name',
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notNull: true,
          notEmpty: true,
        },
      },
    },
    {
      sequelize,
      modelName: 'Superpowers',
      tableName: 'superpowers',
      underscored: true,
    }
  );
  return Superpowers;
};
