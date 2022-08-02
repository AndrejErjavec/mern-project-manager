import axios from '../config/axios';

const TASK_URL = '/api/task/';

const createTask = async (taskData, projectId) => {
  const response = await axios.post(TASK_URL + `create?id=${projectId}`, taskData);
  return response.data;
}

const updateTask = async (taskData) => {

};

const deleteTask = async (taskId) => {
  const response = await axios.delete(TASK_URL + `delete?id=${taskId}`);
  return response.data;
}

const getTaskById = async (taskId) => {
  const response = await axios.get(TASK_URL + `?id=${taskId}`);
}

const taskService = {
  createTask,
  updateTask,
  deleteTask,
  getTaskById
}

export default taskService;