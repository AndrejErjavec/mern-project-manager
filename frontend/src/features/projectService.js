import axios from '../config/axios';
import {config} from '../config/config';

const PROJECT_URL = '/api/project/';

const createProject = async (projectData) => {
  const response = await axios.post(PROJECT_URL + 'create', projectData, config());
  return response.data;
};

const updateProject = async (projectId, projectData) => {
  const response = await axios.put(PROJECT_URL + `update?id=${projectId}`, projectData, config());
  return response.data;
};

const deleteProject = async (projectId) => {
  const response = await axios.delete(PROJECT_URL + `delete?id=${projectId}`, config());
  return response.data;
};

const getProjectById = async (projectId) => {
  const response = axios.get(PROJECT_URL + `?id=${projectId}`, config());
  return response.data;
};

const getProjectTasks = async (projectId) => {
  const response = await axios.get(PROJECT_URL + `tasks?id=${projectId}`, config());
  return response.data;
};

const getProjectUsers = async(projectId) => {
  const response = await axios.get(PROJECT_URL + `users?id=${projectId}`, config());
  return response.data;
};

const getUserProjects = async (userId) => {
  const response = await axios.get(PROJECT_URL + `users/projects?id=${userId}`, config());
  return response.data;
};

const addUser = async (userId, projectId) => {
  const response = await axios.post(PROJECT_URL + `users/add?userId=${userId}&projectId=${projectId}`, config());
  return response.data;
};

const removeUser = async (userId, projectId) => {
  const response = await axios.delete(PROJECT_URL + `users/remove?userId=${userId}&projectId=${projectId}`, config());
  return response.data;
};

const projectService = {
  createProject,
  updateProject,
  deleteProject,
  getProjectById,
  getProjectTasks,
  getProjectUsers,
  getUserProjects,
  addUser,
  removeUser,
};

export default projectService;