import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import loginService from './services/login';
import AppCss from './App.css';
import AddBlog from './components/AddBlog';
import Toggable from './components/Toggable';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState('');
  const [notification, setNotification] = useState({});
  const blogFormRef = React.createRef();

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      blogs.sort((a, b) => (a.likes > b.likes ? -1 : 1));
      setBlogs(blogs);
    });
  }, []);

  useEffect(() => {
    setNotification('');
    const localStorageUser = JSON.parse(localStorage.getItem('user'));
    if (localStorageUser) {
      setUser(localStorageUser);
      blogService.setToken(localStorageUser.token);
    }
  }, []);

  const handleLogin = async (userLogin) => {
    try {
      const loginResponse = await loginService.login(userLogin);
      if (loginResponse.status === 400) {
        makeNotification('wrong username or password! Press f for you my dear friend..', 0);
      } else {
        const login = loginResponse.data;
        localStorage.setItem('user', JSON.stringify(login));
        setUser({ ...login });
        blogService.setToken(login.token);
        makeNotification('Logged in succesfully', 1);
      }
    } catch (err) {
      console.log('we have an error, F', err);
      makeNotification('wrong username or password! Press f for you my dear friend..', 0);
    }
  };

  const handleAddBlog = async (blog) => {
    blogFormRef.current.toggleVisibility();
    const newBlog = await blogService.add(blog);
    setBlogs(blogs.concat(newBlog));
    makeNotification('New blog added', 1);
  };

  const handleAddLike = async (blog) => {
    blogFormRef.current.toggleVisibility();
    const updateBlog = await blogService.addLike(blog);
    let updatedBlogs = [...blogs];
    updatedBlogs.map((blog) => {
      if (blog.id === updateBlog.id) {
        blog.likes++;
      }
      return blog;
    });
    updatedBlogs.sort((a, b) => (a.likes > b.likes ? -1 : 1));
    setBlogs([...updatedBlogs]);
    makeNotification('Like added to blog' + blog.title, 1);
  };

  const handleLogout = async () => {
    setUser('');
    localStorage.removeItem('user');
    makeNotification('Logged out succesfully', 1);
  };

  const handleRemove = async (id) => {
    try {
      await blogService.deleteBlog(id);
      let newBlogs = [...blogs ];
      console.log(newBlogs);
      newBlogs = newBlogs.filter((blog) => blog.id !== id);
      console.log('new blogs after', newBlogs);
      setBlogs([ ...newBlogs ]);
      makeNotification('Deleted succesfully', 1);
    } catch (err) {
      console.log(err);
      makeNotification('error deleting', 0);
    }
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
        <LoginForm handleLogin={handleLogin}></LoginForm>
      </div>
    );
  }

  return (
    <div>
      <Notification notification={notification}></Notification>
      <h2>Blogs</h2>
      <p>{user.username} logged in</p>
      <button onClick={handleLogout}>Log out</button>
      <Toggable buttonLabel="show add" ref={blogFormRef}>
        <AddBlog handleAddBlog={handleAddBlog} />
      </Toggable>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} handleAddLike={handleAddLike} userId={user.id} handleRemove={handleRemove} />
      ))}
    </div>
  );
};

export default App;
