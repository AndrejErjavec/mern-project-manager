import axios from '../config/axios';

const TASK_URL = '/api/task/';

const createTask = async (taskData, projectId) => {
  const response = await axios.post(TASK_URL + `create?id=${projectId}`, taskData);
  return response.data;
}

const updateTask = async (taskData, taskId) => {
  const response = await axios.put(TASK_URL + `update?id=${taskId}`, taskData);
  return response.data;
};

const deleteTask = async (taskId) => {
  const response = await axios.delete(TASK_URL + `delete?id=${taskId}`);
  return response.data;
}

const getTaskById = async (taskId) => {
  const response = await axios.get(TASK_URL + `?id=${taskId}`);
  return response.data;
}

const getTaskUsers = async (taskId) => {
  const response = await axios.get(TASK_URL + `users?id=${taskId}`);
  return response.data;
}

const getUsersNotInTask = async (taskId) => {
  const response = await axios.get(TASK_URL + `notmembers?id=${taskId}`);
  return response.data;
}

const getSubtasks = async (taskId) => {
  const response = await axios.get(TASK_URL + `subtasks?id=${taskId}`);
  return response.data;
};

const addUser = async (userId, taskId) => {
  const response = await axios.post(TASK_URL + `users/add?userId=${userId}&taskId=${taskId}`);
  return response.data;
}

const addMultipleUsers = async (userIds, taskId) => {
  const responses = Promise.all(userIds.map((userId) => addUser(userId, taskId)));
  return responses;
}

const taskService = {
  createTask,
  updateTask,
  deleteTask,
  getTaskById,
  getTaskUsers,
  getUsersNotInTask,
  getSubtasks,
  addUser,
  addMultipleUsers
}

export default taskService;