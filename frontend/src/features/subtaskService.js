import axios from '../config/axios';

const SUBTASK_URL = '/api/subtask/';

const createSubtask = async (subtaskData, taskId) => {
  const response = await axios.post(SUBTASK_URL + `create?id=${taskId}`, subtaskData);
  return response.data;
};

const updateSubtask = async (subtaskData, subtaskId) => {
  const response = await axios.put(SUBTASK_URL + `update?id=${subtaskId}`, subtaskData);
  return response.data;
};

const getSubtaskById = async (subtaskId) => {
  const response = await axios.get(SUBTASK_URL + `?id=${subtaskId}`);
  return response.data;
};

const subtaskService = {
  createSubtask,
  updateSubtask,
  getSubtaskById
}

export default subtaskService;