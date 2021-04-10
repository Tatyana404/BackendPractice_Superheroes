const createError = require('http-errors');
const { Superpowers } = require('../models');

module.exports.createSuperpower = async (req, res, next) => {
  try {
    const { body } = req;
    const createdSuperpower = await Superpowers.create(body);

    if (!createdSuperpower) {
      return next(createError(400, 'Error while creating superpower'));
    }

    res.status(201).send({
      data: createdSuperpower,
    });
  } catch (err) {
    next(err);
  }
};

module.exports.getAllSuperpowers = async (req, res, next) => {
  try {
    const { pagination = {} } = req;
    const superpowers = await Superpowers.findAll({ ...pagination });

    if (!superpowers.length) {
      return next(createError(404, 'Superpowers not found'));
    }

    res.status(200).send({
      data: superpowers,
    });
  } catch (err) {
    next(err);
  }
};

module.exports.deleteSuperpower = async (req, res, next) => {
  try {
    const {
      params: { superpowerId },
    } = req;

    const rowsCount = await Superpowers.destroy({
      where: { id: superpowerId },
    });

    if (!rowsCount) {
      return next(createError(404, 'Superpower not found'));
    }

    res
      .status(200)
      .send({ data: `${rowsCount} Superpower successfully removed` });
  } catch (err) {
    next(err);
  }
};
