'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Superpowers extends Model {
    static associate (models) {
      Superpowers.belongsTo(models.Supergeroes, {
        // through: 'superpowers',
        foreignKey: 'heroId',
      });
    }
  }
  Superpowers.init(
    {
      heroId: {
        field: 'hero_id',
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Supergeroes',
          key: 'id',
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
      },
      powerName: {
        field: 'power_name',
        allowNull: false,
        unique: true,
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
