const express = require('express');
const router = express.Router();
const {createProject,updateProject,deleteProject, getProjectById, getAllProjects, getTasks} = require('../controllers/projectController');
const {getUsersOfProject, getProjectsOfUser} = require('../controllers/userProjectController');
const {protect} = require('../middleware/authMiddleware');

router.post('/create', protect, createProject);
router.put('/update', protect, updateProject);
router.delete('/delete', protect, deleteProject);
router.get('/users', protect, getProjectsOfUser);
router.get('/projects', protect, getUsersOfProject);
router.get('/', protect, getProjectById);
router.get('/all', protect, getAllProjects);
router.get('/tasks', getTasks);

module.exports = router;