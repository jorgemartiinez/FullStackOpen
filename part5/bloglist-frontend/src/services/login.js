import axios from 'axios';

const login = async (login) => {
  const response = await axios.post('/api/login', { username: login.username, password: login.password });
  return response;
};

export default {
  login,
};
