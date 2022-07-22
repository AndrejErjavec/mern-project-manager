const asyncHandler = require('express-async-handler');
const {errorHandler} = require('../middleware/errorMiddlewre');
const UserProject = require('../models/userProjectModel');

const addUserToProject = asyncHandler(async (req, res) => {

});

const removeUserFromProject = asyncHandler(async (req, res) => {

});

const getUsersOfProject = asyncHandler(async (req, res) => {
  const projectId = req.query.id;
  const users = await UserProject.findAllUsersOfProject(projectId);
  res.status(200).json(users);
});

const getProjectsOfUser = asyncHandler(async (req, res) => {
  const userId = req.query.id;
  const projects = await UserProject.findAllProjectsOfUser(userId);
  res.status(200).json(projects);
});

const getTasksOfUserInProject = asyncHandler(async (req, res) => {

});

module.exports = {
  getUsersOfProject, 
  getProjectsOfUser
}