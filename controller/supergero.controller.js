const createError = require('http-errors');
const { Supergero } = require('../models');

module.exports.createSupergero = async (req, res, next) => {
  try {
    const { body } = req;
    const createdSupergero = await Supergero.create(body);

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

    res.status(200).send({ data: `${rowsCount} Supergero successfully deleted` });
  } catch (err) {
    next(err);
  }
};