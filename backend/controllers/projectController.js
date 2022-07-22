const asyncHandler = require('express-async-handler');
const {errorHandler} = require('../middleware/errorMiddlewre');
const Project = require('../models/projectModel');

const createProject = asyncHandler(async (req, res) => {
  const {name, description, status} = req.body;

  if (!name || !description || !status) {
    return errorHandler({err: 'Please fill all fields', req, res, status: 400});
  }

  const managerId = req.user.id;
  const createdAt = new Date().toISOString().slice(0, 19).replace('T', ' ');

  const project = await Project.create(name, description, createdAt, status, managerId);

  if (project.affectedRows > 0) {
    res.status(200).json({
      id: project.insertId,
      message: 'Project created' 
    });
  }
  else {
    return errorHandler({err: 'Project creation failed', status: 400});
  } 
});

const updateProject = asyncHandler(async (req, res) => {
  const id = req.query.id;
  const {name, description, status} = req.body;

  const initialProject = await Project.findById(id);

  const updatedProject = await Project.update(id, name, description, status);

  if (updatedProject.affectedRows > 0) {
    res.status(200).json({
      id: updatedProject.insertedId,
      message: 'Project updated successfully'
    });
  }
  else {
    return errorHandler({err: 'Project update failed', status: 400});
  }
});
  

const deleteProject = asyncHandler(async (req, res) => {
  const id = req.query.id;
  const deletedProject = await Project.delete(id);
  
  if (deletedProject.affectedRows > 0) {
    res.status(200).json({
      message: 'Project deleted successfully'
    });
  }
  else {
    return errorHandler({err: 'Project deletion failed', status: 400});
  }
});

const getProjectById = asyncHandler(async (req, res) => {
  const id = req.query.id;
  const project = await Project.findById(id);
  res.status(200).json(project);
});

const getAllProjects = asyncHandler(async (req, res) => {
  const projects = await Project.findAll();
  return res.status(200).json(projects);
});

const getTasks = asyncHandler(async (req, res) => {
  const id = req.query.id;
  const tasks = await Project.getTasks(id);
  return res.status(200).json(tasks);
});


module.exports = {
  createProject,
  updateProject,
  deleteProject, 
  getProjectById,
  getAllProjects,
  getTasks
}