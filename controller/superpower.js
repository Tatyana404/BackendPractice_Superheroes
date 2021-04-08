const createError = require('http-errors');
const { Superpower } = require('../models');

module.exports.createSuperpower = async (req, res, next) => {
  try {
    const { body } = req;
    const createdSuperpower = await Superpower.create(body);

    if (!createdSuperpower) {
      return next(createError(400));
    }

    res.status(201).send({
      data: createdSuperpower,
    });
  } catch (err) {
    next(err);
  }
};