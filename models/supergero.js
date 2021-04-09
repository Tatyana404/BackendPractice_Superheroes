'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Supergeroes extends Model {
    static associate (models) {
      Supergeroes.belongsToMany(models.Superpowers, {
        through: 'supergeroes_to_superpowers',
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
        type: DataTypes.STRING,
        validate: {
          notNull: true,
          notEmpty: true,
        },
      },
      realName: {
        field: 'real_name',
        unique: true,
        type: DataTypes.STRING,
      },
      originDescription: {
        field: 'origin_description',
        unique: true,
        type: DataTypes.STRING,
      },
      catchPhrase: {
        field: 'catch_phrase',
        unique: true,
        type: DataTypes.STRING,
      },
      images: { type: DataTypes.TEXT },
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
