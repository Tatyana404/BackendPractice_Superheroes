const createError = require('http-errors');
const { Supergeroes, Superpowers } = require('../models');

module.exports.createSupergero = async (req, res, next) => {
  try {
    const { body } = req;
    const createdSupergero = await Supergeroes.create(body);

    const { powerName } = body;
    const {
      dataValues: { id },
    } = createdSupergero;

    const createSuperpower = await Superpowers.bulkCreate(
      powerName.map(stringSuperpowers => ({
        name: stringSuperpowers,
        heroId: id,
      })),
      {
        fields: ['name', 'heroId'],
        returning: true,
      }
    );

    createdSupergero = createSuperpower;

    if (!createdSupergero) {
      return next(createError(400));
    }

    res.status(201).send({
      data: createdSupergero,
    });
  } catch (err) {
    next(err);
  }
};

module.exports.getAllSupergeroes = async (req, res, next) => {
  try {
    const { pagination = {} } = req;
    const supergeroes = await Supergeroes.findAll({ ...pagination });








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

    const [rowsCount, [updateSupergero]] = await Supergeroes.update(body, {
      where: { id },
      returning: true,
    });

    // const { powerName } = body;
    // const {
    //   dataValues: { id },
    // } = updateSupergero;

    // const updateSupergero = await Superpowers.bulkCreate(
    //   powerName.map(stringSuperpowers => ({
    //     name: stringSuperpowers,
    //     heroId: id,
    //   })),
    //   {
    //     fields: ['name', 'heroId'],
    //     returning: true,
    //   }
    // );

    // updateSupergero = updateSupergero;





    if (rowsCount !== 1) {
      return next(createError(400, 'Supergero cant be updated'));
    }

    res.send({ data: updateSupergero });
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
