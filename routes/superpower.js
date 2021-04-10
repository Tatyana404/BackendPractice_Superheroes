const { Router } = require('express');
const SuperpowerController = require('../controller/superpower.controller');
const paginate = require('../middlewares/paginate.mw');

const superpowerRouter = Router();

superpowerRouter.post('/', SuperpowerController.createSuperpower);
superpowerRouter.get('/', paginate, SuperpowerController.getAllSuperpowers);
superpowerRouter.delete('/:superpowerId', SuperpowerController.deleteSuperpower);

module.exports = superpowerRouter;