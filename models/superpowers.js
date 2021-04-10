'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Superpowers extends Model {
    static associate (models) {
      Superpowers.belongsTo(models.Supergeroes, {
        foreignKey: 'heroId',
        onUpdate: 'cascade',
        onDelete: 'cascade',
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
        type: DataTypes.STRING(500),
        validate: {
          notNull: true,
          notEmpty: true,
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
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
