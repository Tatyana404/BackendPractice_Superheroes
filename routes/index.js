const { Router } = require('express');
const supergeroRouter = require('./supergero');

const router = Router();

router.use('/supergeroes', supergeroRouter);

module.exports = router;