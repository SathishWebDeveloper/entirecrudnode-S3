const express = require('express');
const multer = require('multer');
const router = express.Router();
const imageController = require('../controller/imagecontroller');

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })


router.post('/singleimage' , upload.single('image') , imageController.uniqueImageUpload);


module.exports = router;