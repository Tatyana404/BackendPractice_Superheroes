const { Router } = require('express');
const SupergeroController = require('../controller/supergero');
const paginate = require('../middlewares/paginate.mw');

const supergeroRouter = Router();

supergeroRouter
  .route('/')
  .post(SupergeroController.createSupergero)
  .get(paginate, SupergeroController.getAllSupergeroes);

supergeroRouter.patch('/:id', SupergeroController.updateSupergero);

supergeroRouter.delete('/:supergeroId', SupergeroController.deleteSupergero);

module.exports = supergeroRouter;
