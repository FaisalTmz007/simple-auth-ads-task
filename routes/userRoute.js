const express = require('express');
const userController = require('../controllers/userController');
const {authMiddleware} = require('../middlewares/auth');
const router = express.Router();

router.get('/me', authMiddleware, userController.myProfile);
router.put('/me', authMiddleware, userController.updateMyProfile);
router.put('/me/profileImg', authMiddleware, userController.changeProfileImage);
router.delete('/me/profileImg', authMiddleware, userController.deleteProfileImage);
router.get('/profile', authMiddleware, userController.getAllUsers),
router.get('/profile/:id', authMiddleware, userController.getProfileUser);


module.exports = router;