'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Supergeroes extends Model {
    static associate (models) {
      Supergeroes.hasMany(models.Superpowers, {
        // through: 'superpowers',
        foreignKey: 'heroId',
        onDelete: 'cascade',
      });
    }
  }
  Supergeroes.init(
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
      modelName: 'Supergeroes',
      tableName: 'supergeroes',
      underscored: true,
    }
  );
  return Supergeroes;
};
