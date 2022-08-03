import axios from '../config/axios';


const PROJECT_URL = '/api/project/';

const createProject = async (projectData) => {
  const response = await axios.post(PROJECT_URL + 'create', projectData);
  return response.data;
};

const updateProject = async (projectId, projectData) => {
  const response = await axios.put(PROJECT_URL + `update?id=${projectId}`, projectData);
  return response.data;
};

const deleteProject = async (projectId) => {
  const response = await axios.delete(PROJECT_URL + `delete?id=${projectId}`);
  return response.data;
};

const getProjectById = async (projectId) => {
  const response = axios.get(PROJECT_URL + `?id=${projectId}`);
  return response.data;
};

const getProjectTasks = async (projectId) => {
  const response = await axios.get(PROJECT_URL + `tasks?id=${projectId}`);
  return response.data;
};

const getProjectComments = async (projectId) => {
  const response = await axios.get(PROJECT_URL + `comments?id=${projectId}`);
  return response.data;
}

const getProjectUsers = async(projectId) => {
  const response = await axios.get(PROJECT_URL + `users?id=${projectId}`);
  return response.data;
};

const getUsersNotInProject = async (projectId) => {
  const response = await axios.get(PROJECT_URL + `notmembers?id=${projectId}`);
  return response.data;
}

const getUserProjects = async (userId) => {
  const response = await axios.get(PROJECT_URL + `users/projects?id=${userId}`);
  return response.data;
};

const addUser = async (userId, projectId) => {
  const response = await axios.post(PROJECT_URL + `users/add?userId=${userId}&projectId=${projectId}`);
  return response.data;
};

const removeUser = async (userId, projectId) => {
  const response = await axios.delete(PROJECT_URL + `users/remove?userId=${userId}&projectId=${projectId}`);
  return response.data;
};

const projectService = {
  createProject,
  updateProject,
  deleteProject,
  getProjectById,
  getProjectTasks,
  getProjectComments,
  getProjectUsers,
  getUsersNotInProject,
  getUserProjects,
  addUser,
  removeUser,
};

export default projectService;