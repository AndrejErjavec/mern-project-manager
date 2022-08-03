const asyncHandler = require('express-async-handler');
const {errorHandler} = require('../middleware/errorMiddlewre');
const UserProject = require('../models/userProjectModel');
const User = require('../models/userModel');
const Project = require('../models/projectModel');

const addUserToProject = asyncHandler(async (req, res) => {
  const userId = req.query.userId;
  const projectId = req.query.projectId;

  // Does user exist?
  const userExists = await User.findById(userId);
  if (userExists.length == 0) {
    return errorHandler({err: 'User not found', req, res, status: 404});
  }

  // Does project exist?
  const project = await Project.findById(projectId);
  if (project.length == 0) {
    return errorHandler({err: 'Project not found', req, res, status: 404});
  }

  // Is user already in project
  const userExsists = await UserProject.findOneUserOfProject(userId, projectId);
  if (userExsists.length > 0) {
    return errorHandler({err: 'User already exists', req, res, status: 404});
  }

  // Is request user a member?
  const user = await UserProject.findOneUserOfProject(req.user.id, projectId);
  if (user.length == 0) {
    return errorHandler({err: 'Not authorized', req, res, status: 401});
 }

  const userProject = await UserProject.add(userId, projectId);
  res.status(200).json(userProject);
});

const removeUserFromProject = asyncHandler(async (req, res) => {
  const userId = req.query.userId;
  const projectId = req.query.projectId;

  // Does user exist?
  const user = await User.findById(userId);
  if (user.length == 0) {
    return errorHandler({err: 'User not found', req, res, status: 404});
  }

  // Does project exist?
  const project = await Project.findById(projectId);
  if (project.length == 0) {
    return errorHandler({err: 'Project not found', req, res, status: 404});
  }

  // Is user a member of project?
  const userExsists = await UserProject.findOneUserOfProject(userId, projectId);
  if (userExsists.length == 0) {
    return errorHandler({err: 'User is not a member of project', req, res, status: 404});
  }

  // Is request user a manager?
  if (project[0].manager_id != req.user.id) {
    return errorHandler({err: 'Not authorized', req, res, status: 401});
  }

  const userProject = await UserProject.delete(userId, projectId);
  res.status(200).json(userProject);
});

const getUsersOfProject = asyncHandler(async (req, res) => {
  const projectId = req.query.id;

  const user = await UserProject.findOneUserOfProject(req.user.id, projectId);
  if (user.length == 0) {
    return errorHandler({err: 'Not authorized', req, res, status: 401});
  }

  const users = await UserProject.findAllUsersOfProject(projectId);
  res.status(200).json(users);
});

const getUsersNotInProject = asyncHandler(async (req, res) => {
  const projectId = req.query.id;

  const user = await UserProject.findOneUserOfProject(req.user.id, projectId);
  if (user.length == 0) {
    return errorHandler({err: 'Not authorized', req, res, status: 401});
  }

  const users = await UserProject.findUsersNotInProject(projectId);
  res.status(200).json(users);
})

const getProjectsOfUser = asyncHandler(async (req, res) => {
  const userId = req.query.id;
  const projects = await UserProject.findAllProjectsOfUser(userId);
  res.status(200).json(projects);
});


module.exports = {
  addUserToProject,
  removeUserFromProject,
  getUsersOfProject,
  getUsersNotInProject,
  getProjectsOfUser,
}