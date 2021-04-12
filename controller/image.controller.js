const createError = require('http-errors');
const { Images } = require('../models/');

// module.exports.createImage = async (req, res, next) => {
//   try {
//     const { body } = req;
//     const createdImage = await Images.create(body);

//     if (!createdImage) {
//       return next(createError(400, 'Error while creating the image'));
//     }

//     res.status(201).send({
//       data: createdImage,
//     });
//   } catch (err) {
//     next(err);
//   }
// };

module.exports.createImage = async (req, res, next) => {
  try {
    const {
      file: { filename },
      params: { heroId },
    } = req;

    const [count, [updatedSupergero]] = await Images.update(
      { imagePath: filename },
      {
        where: { id: heroId },
        returning: true,
      }
    );

    res.send(updatedSupergero);
  } catch (err) {
    next(err);
  }
};

module.exports.getAllImages = async (req, res, next) => {
  try {
    const { pagination = {} } = req;
    const images = await Images.findAll({
      attributes: {
        exclude: ['heroId'],
      },
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

    const rowsCount = await Images.destroy({
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
