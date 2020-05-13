import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import loginService from './services/login';
import AppCss from './App.css';
import AddBlog from './components/AddBlog';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [blog, setBlog] = useState({});
  const [user, setUser] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [notification, setNotification] = useState({});

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    setNotification('');
    const localStorageUser = JSON.parse(localStorage.getItem('user'));
    if (localStorageUser) {
      setUser(localStorageUser);
      blogService.setToken(localStorageUser.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const login = await loginService.login(username, password);
      setUser(login);
      localStorage.setItem('user', JSON.stringify(login));
      blogService.setToken(login.token);
      makeNotification('Logged in succesfully', 1);
    } catch (err) {
      console.log('we have an error, F', err);
      makeNotification('wrong username or password! Press f for you my dear friend..', 0);
    }
  };

  const handleAddBlog = async (event) => {
    event.preventDefault();
    const newBlog = await blogService.add(blog);
    setBlogs(blogs.concat(newBlog));
    makeNotification('New blog added', 1);
  };

  const handleLogout = async (event) => {
    setUser('');
    localStorage.removeItem('user');
    makeNotification('Logged out succesfully', 1);
  };

  const makeNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification('');
    }, 5000);
  };

  if (!user) {
    return (
      <div>
        <Notification notification={notification}></Notification>
        <LoginForm handleLogin={handleLogin} setUsername={setUsername} setPassword={setPassword}></LoginForm>
      </div>
    );
  }

  return (
    <div>
      <Notification notification={notification}></Notification>
      <h2>Blogs</h2>
      <p>{user.username} logged in</p>
      <AddBlog setBlog={setBlog} handleAddBlog={handleAddBlog} />
      <button onClick={handleLogout}>Log out</button>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
