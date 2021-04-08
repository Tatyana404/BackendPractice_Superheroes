const { Router } = require('express');
const SupergeroController = require('../controller/supergero.controller');

const supergeroRouter = Router();

supergeroRouter.post('/', SupergeroController.createSupergero);
supergeroRouter.delete('/:supergeroId', SupergeroController.deleteSupergero);

module.exports = supergeroRouter;
