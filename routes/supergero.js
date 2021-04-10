const { Router } = require('express');
const SupergeroController = require('../controller/supergero.controller');
const paginate = require('../middlewares/paginate.mw');

const supergeroRouter = Router();

supergeroRouter.post('/', SupergeroController.createSupergero);
supergeroRouter.get('/', paginate, SupergeroController.getAllSupergeroes);
supergeroRouter.patch('/:id', SupergeroController.updateSupergero);
supergeroRouter.delete('/:supergeroId', SupergeroController.deleteSupergero);

module.exports = supergeroRouter;