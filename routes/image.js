const { Router } = require('express');
const ImageController = require('../controller/image');
const upload = require('../middlewares/rename.helper.img.mw');
const paginate = require('../middlewares/paginate.mw');

const imageRouter = Router();

imageRouter.post('/img', upload.single('image'), ImageController.createImagesMulter);
imageRouter.post('/', ImageController.createImages);
imageRouter.get('/', paginate, ImageController.getAllImages);
imageRouter.delete('/:imageId', ImageController.deleteImage);

module.exports = imageRouter;
