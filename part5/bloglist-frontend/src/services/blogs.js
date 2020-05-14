import axios from 'axios';
const baseUrl = '/api/blogs';
let token = null;

const setToken = (newToken) => {
  token = `${newToken}`;
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const add = async (newBlog) => {
  const config = {
    headers: { token },
  };
  const response = await axios.post(baseUrl, newBlog, config);
  return response.data;
};

const addLike = async (newBlog) => {
  const config = {
    headers: { token },
  };
  const response = await axios.put(`${baseUrl}/${newBlog.id}`, newBlog, config);
  return response.data;
};

const deleteBlog = async (id) => {
  const config = {
    headers: { token },
  };
  const response = await axios.delete(`${baseUrl}/${id}`, config);
  return response.data;
};

export default { getAll, add, setToken, addLike, deleteBlog };
