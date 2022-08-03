import axios from '../config/axios';

const USER_URL = '/api/user/';

const getUserById = async (userId) => {
  const response = await axios.get(USER_URL + `getuserbyid?id=${userId}`);
  return response.data;
};

const getAllUsers = async () => {
  const response = await axios.get(USER_URL + 'all');
  return response.data;
}

const userService = {
  getUserById,
  getAllUsers
}

export default userService;