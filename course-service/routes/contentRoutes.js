const express = require('express');
const router = express.Router();
const contentController = require('../controllers/contentController');
const multer = require(`multer`);
const upload = multer({ storage: multer.memoryStorage() });

router.post('/add-content', upload.single('file'), contentController.createContent);

module.exports = router;
