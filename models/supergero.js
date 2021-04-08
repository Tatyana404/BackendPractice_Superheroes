'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Supergeroes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
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
      modelName: 'Supergero',
      tableName: 'supergeroes',
      underscored: true,
    }
  );
  return Supergeroes;
};
