'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Supergero extends Model {
    static associate (models) {
      Supergero.hasMany(models.Superpower, {
        foreignKey: 'heroId',
        onUpdate: 'cascade',
        onDelete: 'cascade',
      });
      Supergero.hasMany(models.Image, {
        foreignKey: 'heroId',
        onUpdate: 'cascade',
        onDelete: 'cascade',
      });
    }
  }
  Supergero.init(
    {
      nickName: {
        field: 'nick_name',
        unique: true,
        allowNull: false,
        type: DataTypes.STRING(128),
        validate: {
          notNull: true,
          notEmpty: true,
        },
      },
      realName: {
        field: 'real_name',
        unique: true,
        type: DataTypes.STRING(128),
      },
      originDescription: {
        field: 'origin_description',
        unique: true,
        type: DataTypes.STRING(500),
      },
      catchPhrase: {
        field: 'catch_phrase',
        unique: true,
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: 'Supergero',
      tableName: 'supergeroes',
      underscored: true,
    }
  );
  return Supergero;
};
