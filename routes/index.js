const { Router } = require('express');
const supergeroRouter = require('./supergero');
const superpowerRouter = require('./superpower');
const imageRouter = require('./image');

const router = Router();

router.use('/supergeroes', supergeroRouter);
router.use('/superpowers', superpowerRouter);
router.use('/images', imageRouter);

module.exports = router;
