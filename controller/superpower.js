const createError = require('http-errors');
const { Superpower } = require('../models');

module.exports.getAllSuperpowers = async (req, res, next) => {
  try {
    const { pagination = {} } = req;
    const superpowers = await Superpower.findAll({ ...pagination });

    if (!superpowers?.length) {
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

    const rowsCount = await Superpower.destroy({
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
