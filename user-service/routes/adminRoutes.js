const express = require('express');
const router = express.Router();
const adminController = require(`../controllers/adminController`)

router.route('/alllearners').get(adminController.getAllLearners);
router.route('/allinstructors').get(adminController.getAllInstructors);

module.exports = router;