const express = require('express');
const router = express.Router();
const Enroll = require('../models/enrollmentModel');

// Import your controller functions
const {
    enroll,
    getEnrolls,
    getEnrollsById,
    updateEnroll,
    deleteEnroll
} = require('../controllers/enrollController');

// Routes
router.post('/enroll', enroll);
router.get('/enrolls', getEnrolls);
router.get('/enrolls/:learnerId', getEnrollsById);
router.put('/enroll/:id', updateEnroll);
router.delete('/enroll/:id', deleteEnroll);

module.exports = router;
