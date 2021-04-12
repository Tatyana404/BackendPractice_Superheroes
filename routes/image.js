const { Router } = require('express');
const ImageController = require('../controller/image.controller');
const upload = require('../middlewares/multer.mw');
const paginate = require('../middlewares/paginate.mw');

const imageRouter = Router();

imageRouter.post('/image', upload.any('image'), ImageController.createImageMulter);
imageRouter.post('/', ImageController.createImage);
imageRouter.get('/', paginate, ImageController.getAllImages);
imageRouter.delete('/:imageId', ImageController.deleteImage);

module.exports = imageRouter;
