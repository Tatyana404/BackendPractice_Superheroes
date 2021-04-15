const createError = require('http-errors');
const { Supergeroes, Superpowers, Images } = require('../models');

module.exports.createSupergero = async (req, res, next) => {
  try {
    const { body } = req;
    const createdSupergero = await Supergeroes.create(body);
    const { powerName, imagePath } = body;
    const {
      dataValues: { id },
    } = createdSupergero;

    await Superpowers.bulkCreate(
      powerName.map(stringSuperpowers => ({
        powerName: stringSuperpowers,
        heroId: id,
      })),
      {
        fields: ['powerName', 'heroId'],
        returning: true,
      }
    );

    await Images.bulkCreate(
      imagePath.map(stringImages => ({
        imagePath: stringImages,
        heroId: id,
      })),
      {
        fields: ['imagePath', 'heroId'],
        returning: true,
      }
    );

    if (!createdSupergero) {
      return next(createError(400, 'Error when creating a hero'));
    }

    const newHero = await Supergeroes.findAll({
      include: [
        {
          model: Superpowers,
          attributes: ['id', 'powerName'],
        },
        {
          model: Images,
          attributes: ['id', 'imagePath'],
        },
      ],
    });

    res.status(201).send({
      data: newHero,
    });
  } catch (err) {
    next(err);
  }
};

module.exports.getAllSupergeroes = async (req, res, next) => {
  try {
    const { pagination = {} } = req;
    const supergeroes = await Supergeroes.findAll({
      ...pagination,
      include: [
        {
          model: Superpowers,
          attributes: ['id', 'powerName'],
        },
        {
          model: Images,
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

    const [rowsCount, []] = await Supergeroes.update(body, {
      where: { id },
      returning: true,
    });

    await Superpowers.bulkCreate(
      powerName.map(stringSuperpowers => ({
        powerName: stringSuperpowers,
        heroId: id,
      }))
    );

    await Images.bulkCreate(
      imagePath.map(stringImages => ({
        imagePath: stringImages,
        heroId: id,
      }))
    );

    if (rowsCount !== 1) {
      return next(createError(400, 'Supergero cant be updated'));
    }

    const updateHero = await Supergeroes.findAll({
      include: [
        {
          model: Superpowers,
          attributes: ['id', 'powerName'],
        },
        {
          model: Images,
          attributes: ['id', 'imagePath'],
        },
      ],
    });

    res.send({ data: updateHero });
  } catch (err) {
    next(err);
  }
};

module.exports.deleteSupergero = async (req, res, next) => {
  try {
    const {
      params: { supergeroId },
    } = req;

    const rowsCount = await Supergeroes.destroy({
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
