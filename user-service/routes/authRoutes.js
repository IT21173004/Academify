const express = require('express');
const router = express.Router();
const authController = require(`../controllers/authController`)

router.route('/register').post(authController.signUp);
router.route('/login').post(authController.signIn);
router.route('/view').get(authController.getUserProfile);
router.route('/edit/:id').put(authController.updateUser);

router.route('/allusers').get(authController.getAllUsers);
router.route('/get/:id').get(authController.getUserById);
router.route('/delete/:id').delete(authController.deleteUserById);
router.route('/update/:id').put(authController.updateUserById);


module.exports = router;