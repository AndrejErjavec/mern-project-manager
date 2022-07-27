const express = require('express');
const router = express.Router();
const {createTask, updateTask, deleteTask, getSubtasks, getComments, getTaskById} = require('../controllers/taskController');
const {addUserToTask, removeUserFromTask, getUsersOfTask, getTasksOfUserInProject} = require('../controllers/userTaskController');
const {protect} = require('../middleware/authMiddleware');

router.get('/', protect, getTaskById);
router.post('/create', protect, createTask);
router.put('/update', protect, updateTask);
router.delete('/delete', protect, deleteTask);
router.get('/subtasks', protect, getSubtasks);
router.get('/comments', protect, getComments);
router.get('/users', protect, getUsersOfTask);
router.post('/users/add', protect, addUserToTask);
router.delete('/users/remove', protect, removeUserFromTask);
router.get('/users/tasks', protect, getTasksOfUserInProject);

module.exports = router;