const asyncHandler = require('express-async-handler');
const {errorHandler} = require('../middleware/errorMiddlewre');
const User = require('../models/userModel');
const Task = require('../models/taskModel');
const Project = require('../models/projectModel');
const UserProject = require('../models/userProjectModel');
const UserTask = require('../models/userTaskModel');

const addUserToTask = asyncHandler(async (req, res) => {
  const userId = req.query.userId;
  const taskId = req.query.taskId;

  // Does user exist?
  const userExists = await User.findById(userId);
  if (userExists.length == 0) {
    return errorHandler({err: 'User not found', req, res, status: 404});
  }

  // Does task exist?
  const task = await Task.findById(taskId);
  if (task.length == 0) {
    return errorHandler({err: 'Task not found', req, res, status: 404});
  }

  // Is user in project
  const userExsists = await UserProject.findOneUserOfProject(userId, task[0].project_id);
  if (userExsists.length == 0) {
    return errorHandler({err: 'User not a member of project', req, res, status: 404});
  }

  // Is user already in task
  const userExsitsInTask = await Task.findOneUserOfTask(userId, taskId);
  if (userExsitsInTask.length > 0) {
    return errorHandler({err: 'Task already assigned to user', req, res, status: 401});
  }

  // Is request user a member?
  const user = await UserProject.findOneUserOfProject(req.user.id, task[0].project_id);
  if (user.length == 0) {
    return errorHandler({err: 'Not authorized', req, res, status: 401});
 }

  const userTask = await UserTask.add(userId, taskId);
  res.status(200).json(userTask);
});

const removeUserFromTask = asyncHandler(async (req, res) => {
  const userId = req.query.userId;
  const taskId = req.query.taskId;

  // Does user exist?
  const userExists = await User.findById(userId);
  if (userExists.length == 0) {
    return errorHandler({err: 'User not found', req, res, status: 404});
  }

  // Does task exist?
  const task = await Task.findById(taskId);
  if (task.length == 0) {
    return errorHandler({err: 'Task not found', req, res, status: 404});
  }

  // Is user already in task
  const userExsitsInTask = await Task.findOneUserOfTask(userId, taskId);
  if (userExsitsInTask.length == 0) {
    return errorHandler({err: 'Task not assigned to user', req, res, status: 401});
  }

  // Is request user a member?
  const user = await UserProject.findOneUserOfProject(req.user.id, task[0].project_id);
  if (user.length == 0) {
    return errorHandler({err: 'Not authorized', req, res, status: 401});
  }

  const userTask = await UserTask.remove(userId, taskId);
  res.status(200).json(userTask);
});

const getUsersOfTask = asyncHandler(async (req, res) => {
  const taskId = req.query.id;

  const task = await Task.findById(taskId);
  if (task.length == 0) {
    return errorHandler({err: 'Task not found', req, res, status: 404});
  }

  const user = await UserProject.findOneUserOfProject(req.user.id, task[0].project_id);   
  if (user.length == 0) {
    return errorHandler({err: 'Not authorized', req, res, status: 401});
  }

  const users = await UserTask.findAllUsersOfTask(taskId);
  res.status(200).json(users);
});

const getTasksOfUserInProject = asyncHandler(async (req, res) => {
  const userId = req.query.userId;
  const projectId = req.query.projectId;

  

  const user = await UserProject.findOneUserOfProject(req.user.id, projectId);   
  if (user.length == 0) {
    return errorHandler({err: 'Not authorized', req, res, status: 401});
  }

  const tasks = await UserTask.findAllTasksOfUserInProject(userId, projectId);
  res.status(200).json(tasks);
});


module.exports = {
  addUserToTask,
  removeUserFromTask,
  getUsersOfTask,
  getTasksOfUserInProject,
}