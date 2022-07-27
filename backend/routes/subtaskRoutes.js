const express = require('express');
const router = express.Router();
const {createSubtask, updateSubtask, deleteSubtask, getSubtaskById} = require('../controllers/subtaskController');
const {protect} = require('../middleware/authMiddleware');

router.get('/', protect, getSubtaskById);
router.post('/create', protect, createSubtask);
router.put('/update', protect, updateSubtask);
router.delete('/delete', protect, deleteSubtask);

module.exports = router;