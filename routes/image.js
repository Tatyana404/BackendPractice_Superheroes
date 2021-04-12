const path = require('path');
const { Router } = require('express');
const multer = require('multer');
const ImageController = require('../controller/image.controller');
const { STATIC_PATH } = require('../config/config');
const paginate = require('../middlewares/paginate.mw');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, STATIC_PATH);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}.${file.originalname}`);
  },
});

const upload = multer({ storage });

const imageRouter = Router();

imageRouter.post('/', upload.any('image'), ImageController.createImage);
imageRouter.get('/', paginate, ImageController.getAllImages);
imageRouter.delete('/:imageId', ImageController.deleteImage);

module.exports = imageRouter;
