'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    static associate (models) {
      Image.belongsTo(models.Supergero, {
        foreignKey: 'heroId',
        onUpdate: 'cascade',
        onDelete: 'cascade',
      });
    }
  }
  Image.init(
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
      imagePath: {
        field: 'image_path',
        allowNull: false,
        type: DataTypes.TEXT,
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
      modelName: 'Image',
      tableName: 'images',
      underscored: true,
    }
  );
  return Image;
};
