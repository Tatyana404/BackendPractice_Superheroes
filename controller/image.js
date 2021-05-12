const createError = require('http-errors');
const { Image } = require('../models');

module.exports.createImages = async (req, res, next) => {
  try {
    const {
      file: { filename },
      params: { heroId },
    } = req;

    const images = await Image.bulkCreate(
      filename.map(stringImages => ({
        imagePath: stringImages,
        heroId: heroId,
      }))
    );

    res.send({ data: images });
  } catch (err) {
    next(err);
  }
};


module.exports.getAllImages = async (req, res, next) => {
  try {
    const { pagination = {} } = req;
    const images = await Image.findAll({
      ...pagination,
    });

    if (!images.length) {
      return next(createError(404, 'Images not found'));
    }

    res.status(200).send({
      data: images,
    });
  } catch (err) {
    next(err);
  }
};

module.exports.deleteImage = async (req, res, next) => {
  try {
    const {
      params: { imageId },
    } = req;

    const rowsCount = await Image.destroy({
      where: { id: imageId },
    });

    if (!rowsCount) {
      return next(createError(404, 'Image not found'));
    }

    res.status(200).send({ data: `${rowsCount} Image successfully deleted` });
  } catch (err) {
    next(err);
  }
};
