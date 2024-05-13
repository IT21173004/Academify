const express = require('express');
const router=express.Router();
const courseController = require('../controllers/courseController');

router.post('/add-course', courseController.addCourse);
router.get('/get-courselist', courseController.getAllCourses);
router.get('/view-course/:id', courseController.viewCourse);
router.put('/update-course/:id', courseController.updateCourse);
router.delete('/delete-course/:id', courseController.deleteCourse);
router.get('/get-courses/:id', courseController.getCoursesByInstructor);


module.exports = router;