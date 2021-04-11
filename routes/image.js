const path = require('path');
const { Router } = require('express');
const multer = require('multer');
const ImageController = require('../controller/image.controller');
// const paginate = require('../middlewares/paginate.mw');

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, STATIC_PATH);
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${Date.now()}.${file.originalname}`);
//   },
// });

const upload = multer({ dest: path.resolve(__dirname, '../public/images') });

const imageRouter = Router();

imageRouter.post('/', upload.any('image'), ImageController.createImage);

module.exports = imageRouter;
