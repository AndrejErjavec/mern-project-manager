let config;
const user = JSON.parse(localStorage.getItem('user'));

const getConfig = () => {
  if (user) {
    const token = user.token;
    config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    return config;
  }
  else {
    return new Error('No token');
  }
}

module.exports = {
  config: getConfig
}