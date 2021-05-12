const createError = require('http-errors');
const { Supergero, Superpower, Image } = require('../models');

module.exports.createSupergero = async (req, res, next) => {
  try {
    const {
      body,
      body: { powerName, imagePath },
    } = req;

    const createdSupergero = await Supergero.create(body);
    const { id } = createdSupergero;

    if (!id) {
      return next(createError(400, 'Error when creating a hero'));
    }

    const superpowers = await Superpower.bulkCreate(
      powerName.map(stringSuperpowers => ({
        powerName: stringSuperpowers,
        heroId: id,
      }))
    );

    if (!superpowers) {
      return next(createError(400, 'Error while creating super powers'));
    }

    const images = await Image.bulkCreate(
      imagePath.map(stringImages => ({
        imagePath: stringImages,
        heroId: id,
      }))
    );

    if (!images) {
      return next(createError(400, 'Error while creating images'));
    }

    res.status(201).send({
      data: [
        {
          ...createdSupergero.get(),
          superpowers,
          images,
        },
      ],
    });
  } catch (err) {
    next(err);
  }
};

module.exports.getAllSupergeroes = async (req, res, next) => {
  try {
    const { pagination = {} } = req;
    const supergeroes = await Supergero.findAll({
      ...pagination,
      include: [
        {
          model: Superpower,
          attributes: ['id', 'powerName'],
        },
        {
          model: Image,
          attributes: ['id', 'imagePath'],
        },
      ],
    });

    if (!supergeroes.length) {
      return next(createError(404, 'Supergeroes not found'));
    }

    res.status(200).send({
      data: supergeroes,
    });
  } catch (err) {
    next(err);
  }
};

module.exports.updateSupergero = async (req, res, next) => {
  try {
    const {
      params: { id },
      body,
    } = req;

    const { powerName, imagePath } = body;

    const [rowsCount, [updateSupergero]] = await Supergero.update(body, {
      where: { id },
      returning: true,
    });

    await Superpower.bulkCreate(
      powerName.map(stringSuperpowers => ({
        powerName: stringSuperpowers,
        heroId: id,
      }))
    );

    await Image.bulkCreate(
      imagePath.map(stringImages => ({
        imagePath: stringImages,
        heroId: id,
      }))
    );

    if (rowsCount !== 1) {
      return next(createError(400, 'Supergero cant be updated'));
    }

    res.send({ data: { updateSupergero } });
  } catch (err) {
    next(err);
  }
};

module.exports.deleteSupergero = async (req, res, next) => {
  try {
    const {
      params: { supergeroId },
    } = req;

    const rowsCount = await Supergero.destroy({
      where: { id: supergeroId },
    });

    if (!rowsCount) {
      return next(createError(404, 'Supergero not found'));
    }

    res
      .status(200)
      .send({ data: `${rowsCount} Supergero successfully deleted` });
  } catch (err) {
    next(err);
  }
};
