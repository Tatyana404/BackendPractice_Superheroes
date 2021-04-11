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

    // await Superpowers.bulkCreate(
    //   powerName.map(stringSuperpowers => ({
    //     powerName: stringSuperpowers,
    //     heroId: id,
    //   })),
    //   {
    //     fields: ['powerName', 'heroId'],
    //     returning: true,
    //   }
    // );

    res.send(updatedSupergero);
  } catch (err) {
    next(err);
  }
};
