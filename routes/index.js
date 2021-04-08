const { Router } = require('express');
const supergeroRouter = require('./supergero');
const superpowerRouter = require('./superpower');

const router = Router();

router.use('/supergeroes', supergeroRouter);
// router.use('/superpowers', superpowerRouter);

module.exports = router;
