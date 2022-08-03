const express = require('express');
const router = express.Router();
const {createProject, updateProject, deleteProject, getProjectById, getAllProjects, getTasks, getComments} = require('../controllers/projectController');
const {getUsersOfProject, getUsersNotInProject, getProjectsOfUser, addUserToProject, removeUserFromProject} = require('../controllers/userProjectController');
const {protect} = require('../middleware/authMiddleware');

router.get('/', protect, getProjectById);
router.post('/create', protect, createProject);
router.put('/update', protect, updateProject);
router.delete('/delete', protect, deleteProject);
router.get('/users', protect, getUsersOfProject);
router.get('/notmembers', protect, getUsersNotInProject);
router.get('/all', protect, getAllProjects);
router.get('/tasks', protect, getTasks);
router.get('/comments', protect, getComments);
router.post('/users/add', protect, addUserToProject);
router.delete('/users/remove', protect, removeUserFromProject);
router.get('/users/projects', protect, getProjectsOfUser);

module.exports = router;