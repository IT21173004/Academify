const express = require('express');
const router = express.Router();
const contentController = require('../controllers/contentController');
const multer = require(`multer`);
const upload = multer({ storage: multer.memoryStorage() });

router.post('/add-content', upload.single('file'), contentController.createContent);
router.get('/:courseId/all-content', contentController.viewAllContentForCourse);
router.get('/view-content/:contentId', contentController.viewContent);
router.put('/update-content/:id', upload.single('file'), contentController.updateContent);


module.exports = router;
