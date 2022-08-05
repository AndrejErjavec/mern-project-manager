const asyncHandler = require('express-async-handler');
const {errorHandler} = require('../middleware/errorMiddlewre');
const Project = require('../models/projectModel');
const UserProject = require('../models/userProjectModel');
const Task = require('../models/taskModel');

const createProject = asyncHandler(async (req, res) => {
  const {name, description} = req.body;

  if (!name || !description) {
    return errorHandler({err: 'Please fill all fields', req, res, status: 400});
  }

  const managerId = req.user.id;
  const createdAt = new Date().toISOString().slice(0, 19).replace('T', ' ');

  const project = await Project.create(name, description, createdAt, managerId);

  if (project.affectedRows > 0) {
    res.status(201).json({
      id: project.insertId,
      name: name,
      description: description,
      createdAt: createdAt,
      managerId: managerId,
      message: 'Project created' 
    });
  }
  else {
    return errorHandler({err: 'Project creation failed', req, res, status: 400});
  } 
});

const updateProject = asyncHandler(async (req, res) => {
  const id = req.query.id;
  const {name, description} = req.body;
  const userId = req.user.id;

  const project = await Project.findById(id);
  if (project.length == 0) {
    return errorHandler({err: 'Project not found', req, res, status: 404});
  }

  if (project[0].manager_id != userId) {
    return errorHandler({err: 'Not authorized', req, res, status: 401});
  }

  const updatedProject = await Project.update(id, name, description);

  if (updatedProject.affectedRows > 0) {
    res.status(200).json({
      id: updatedProject.insertedId,
      message: 'Project updated successfully'
    });
  }
  else {
    return errorHandler({err: 'Project update failed', req, res, status: 400});
  }
});
  
const deleteProject = asyncHandler(async (req, res) => {
  const projectId = req.query.id;
  const userId = req.user.id;

  const project = await Project.findById(projectId);
  if (project.length == 0) {
    return errorHandler({err: 'Project not found', req, res, status: 404});
  }

  if (project[0].manager_id != userId) {
    return errorHandler({err: 'Not authorized', req, res, status: 401});
  }

  const deletedProject = await Project.delete(projectId);
  
  if (deletedProject.affectedRows > 0) {
    res.status(200).json({
      id: projectId,
      message: 'Project deleted successfully'
    });
  }
  else {
    return errorHandler({err: 'Project deletion failed', req, res, status: 400});
  }
});

const getProjectById = asyncHandler(async (req, res) => {
  const projectId = req.query.id;
  const userId = req.user.id;

  const user = await userProject.findOneUserOfProject(userId, projectId);
  if (user.length == 0) {
    return errorHandler({err: 'Not authorized', req, res, status: 400});
  }

  const project = await Project.findById(projectId);
  res.status(200).json(project);
});

const getAllProjects = asyncHandler(async (req, res) => {
  const projects = await Project.findAll();
  return res.status(200).json(projects);
});

const getTasks = asyncHandler(async (req, res) => {
  const projectId = req.query.id;
  const userId = req.user.id;

  const user = await UserProject.findOneUserOfProject(userId, projectId);
  if (user.length == 0) {
    return errorHandler({err: 'Not authorized', req, res, status: 400});
  }

  const tasks = await Project.getTasks(projectId);
  return res.status(200).json(tasks);
});

const getTasksWithSubtasks = asyncHandler(async (req, res) => {
  const projectId = req.query.id;
  const userId = req.user.id;

  const user = await UserProject.findOneUserOfProject(userId, projectId);
  if (user.length == 0) {
    return errorHandler({err: 'Not authorized', req, res, status: 400});
  }

  const tasks = await Project.getTasks(projectId);
});

const getComments = asyncHandler(async (req, res) => {
  const projectId = req.query.id;
  const userId = req.user.id;

  const project = await Project.findById(projectId);
  if (project.length == 0) {
    return errorHandler({err: 'Project not found', req, res, status: 404});
  }

  const user = await UserProject.findOneUserOfProject(userId, project[0].id);
  if (user.length == 0) {
    return errorHandler({err: 'Not authorized', req, res, status: 401});
  }

  const comments = await Project.getComments(projectId);
  res.status(200).json(comments);
});


module.exports = {
  createProject,
  updateProject,
  deleteProject, 
  getProjectById,
  getAllProjects,
  getTasks,
  getTasksWithSubtasks,
  getComments
}