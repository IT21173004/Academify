const express = require('express');
const router = express.Router();
const adminController = require(`../controllers/adminController`)

router.route('/alllearners').get(adminController.getAllLearners);
router.route('/allinstructors').get(adminController.getAllInstructors);

router.route('/update/:id').put(adminController.updateUserById);
router.route('/delete/:id').delete(adminController.deleteUserById);
router.route('/get/:id').get(adminController.getUserById);

module.exports = router;