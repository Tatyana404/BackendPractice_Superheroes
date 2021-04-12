// const createError = require('http-errors');
const { Images, Supergeroes } = require('../models/');

module.exports.createImage = async (req, res, next) => {
  try {
    const {
      file: { filename },
      params: { id },
      body,
    } = req;

    const [count, [updatedSupergero]] = await Supergeroes.update(
      { imagePath: filename },
      {
        where: { id: id },
        returning: true,
      }
    );



    res.send(updatedSupergero);
  } catch (err) {
    next(err);
  }
};
