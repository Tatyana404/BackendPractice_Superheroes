'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Superpowers extends Model {
    static associate (models) {
      Superpowers.belongsTo(models.Supergeroes, {
        foreignKey: 'id',
      });
    }
  }
  Superpowers.init(
    {
      powerName: {
        field: 'power_name',
        allowNull: false,
        unique: true,
        type: DataTypes.STRING,
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
