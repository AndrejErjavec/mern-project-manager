const asyncHandler = require('express-async-handler');
const {errorHandler} = require('../middleware/errorMiddlewre');
const Task = require('../models/taskModel');
const Project = require('../models/projectModel');
const UserProject = require('../models/userProjectModel');

const createTask = asyncHandler(async (req, res) => {
  const {name, dueDate, description, priority, completed} = req.body;

  if (!name || !dueDate || !priority || completed == undefined) {
    return errorHandler({err: 'Please fill all fields',  req, res, status: 401});
  }

  const projectId = req.query.id;
  const userId = req.user.id;

  const project = await Project.findById(projectId);
  if (project.length == 0) {
    return errorHandler({err: 'Project does not exsit',  req, res, status: 404});
  }

  const user = await UserProject.findOneUserOfProject(userId, project[0].id);
  if (user.length == 0) {
    return errorHandler({err: 'Not authorized', req, res, status: 401});
  }

  const createdAt = new Date().toISOString().slice(0, 19).replace('T', ' ');

  const task = await Task.create(name, description, createdAt, dueDate, priority, completed, projectId);

  if (task.affectedRows > 0) {
    res.status(201).json({
      id: task.insertId,
      projectId: projectId,
      name: name,
      description: description,
      dueDate: dueDate,
      priority: priority,
      completed: completed,
      message: 'Task created'
    });
  }
  else {
    return errorHandler({err: 'Task creation failed', req, res, status: 400});
  }
});

const updateTask = asyncHandler(async (req, res) => {
  const taskId = req.query.id;
  const {name, dueDate, description, priority, completed} = req.body;
  const userId = req.user.id;

  if (!name || !dueDate || !priority) {
    return errorHandler({err: 'Please fill all fields',  req, res, status: 401});
  }

  const task = await Task.findById(taskId);
  if (task.length == 0) {
    return errorHandler({err: 'Task not found', req, res, status: 404});
  }

  const project = await Project.findById(task[0].project_id);

  const user = await UserProject.findOneUserOfProject(userId, project[0].id);
  if (user.length == 0) {
    return errorHandler({err: 'Not authorized', req, res, status: 401});
  }

  const updatedTask = await Task.update(taskId, name, dueDate, description, priority, completed);

  if (updatedTask.affectedRows > 0) {
    res.status(200).json({
      id: updatedTask.insertId,
      message: 'Task updated successfully'
    });
  }
  else {
    return errorHandler({err: 'Task update failed', req, res, status: 400});
  }
});

const deleteTask = asyncHandler(async (req, res) => {
  const taskId = req.query.id;
  const userId = req.user.id;

  const task = await Task.findById(taskId);
  if (task.length == 0) {
    return errorHandler({err: 'Task not found', req, res, status: 404});
  }

  const project = await Project.findById(task[0].project_id);

  const user = await UserProject.findOneUserOfProject(userId, project[0].id);
  if (user.length == 0) {
    return errorHandler({err: 'Not authorized', req, res, status: 401});
  }

  const deletedTask = await Task.delete(taskId);

  if (deletedTask.affectedRows > 0) {
    res.status(200).json({
      id: taskId,
      message: 'Task deleted successfully'
    });
  }
  else {
    return errorHandler({err: 'Task deletion failed', req, res, status: 400});
  }
});

const getSubtasks = asyncHandler(async (req, res) => {
  const taskId = req.query.id;
  const userId = req.user.id;

  const task = await Task.findById(taskId);
  if (task.length == 0) {
    return errorHandler({err: 'Task not found', req, res, status: 404});
  }

  const project = await Project.findById(task[0].project_id);

  const user = await UserProject.findOneUserOfProject(userId, project[0].id);
  if (user.length == 0) {
    return errorHandler({err: 'Not authorized', req, res, status: 401});
  }

  const subtasks = await Task.getSubtasks(taskId);
  res.status(200).json(subtasks);
});

const getTaskById = asyncHandler(async (req, res) => {
  const taskId = req.query.id;
  const userId = req.user.id;

  const task = await Task.findById(taskId);
  if (task.length == 0) {
    return errorHandler({err: 'Task not found', req, res, status: 404});
  }

  const project = await Project.findById(task[0].project_id);

  const user = await UserProject.findOneUserOfProject(userId, project[0].id);
  if (user.length == 0) {
    return errorHandler({err: 'Not authorized', req, res, status: 401});
  }
  res.status(200).json(task[0]);
});


module.exports = {
  createTask,
  updateTask,
  deleteTask,
  getSubtasks, 
  getTaskById
}