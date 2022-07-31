import axios from '../config/axios';
import {config} from '../config/config';

const LOGIN_URL = '/api/user/';

const register = async (userData) => {
  const response = await axios.post(LOGIN_URL, userData);
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

const login = async (userData) => {
  const response = await axios.post(LOGIN_URL + 'login', userData);
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};
const logout = () => {
  localStorage.removeItem('user');
};

const getUser = async (email) => {
  const response = await axios.get(LOGIN_URL + `getuser?email=${email}`, config());
  return response.data;
}

const authSerivce = {
  register, 
  login,
  logout,
  getUser
};

export default authSerivce;