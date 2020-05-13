import axios from 'axios';

const login = async (username, password) => {
  const user = await axios.post('/api/login', { username, password });
  return user.data;
};

export default {
  login,
};
