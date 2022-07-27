const express = require('express');
const router = express.Router();
const {registerUser, loginUser, updateUser, deleteUser, getMe, getAll, getUserByEmail, getUserById} = require('../controllers/userController');
const {protect} = require('../middleware/authMiddleware');

router.post('/', registerUser);
router.post('/login', loginUser);
router.delete('/delete', protect, deleteUser);
router.get('/me', protect, getMe);
router.get('/all', protect, getAll);
router.get('/getuser', protect, getUserByEmail);
router.get('/getuserbyid', protect, getUserById);

module.exports = router;