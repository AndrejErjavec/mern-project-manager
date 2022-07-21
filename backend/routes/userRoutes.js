const express = require('express')
const router = express.Router()
const {registerUser, loginUser, getUser, getAll, getuserByEmail}= require('../controllers/userController')
const {protect} = require('../middleware/authMiddleware')

router.post('/', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getUser);
router.get('/all', protect, getAll);
router.get('/getuser', getuserByEmail)

module.exports = router;