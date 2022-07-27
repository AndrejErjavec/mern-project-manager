const express = require('express');
const router = express.Router();
const {protect} = require('../middleware/authMiddleware');
const {createComment, deleteComment, getCommentById} = require('../controllers/commentController');

router.get('/', protect, getCommentById);
router.post('/create', protect, createComment);
router.delete('/delete', protect, deleteComment);

module.exports = router;