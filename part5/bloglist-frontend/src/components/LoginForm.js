import React, { useState } from 'react';
import PropTypes from 'prop-types';

const LoginForm = ({ handleLogin }) => {
  const [login, setLogin] = useState({});

  const handleChange = ({ target }) => {
    let name = target.name;
    let value = target.value;
    const changeBlog = login;
    changeBlog[name] = value;
    setLogin({ ...changeBlog });
  };

  const onSubmit = async (ev) => {
    ev.preventDefault();
    console.log('login on submit');
    await handleLogin(login);
    console.log('llamada hecha vaciamos');
    setLogin({});
  };

  return (
    <div>
      <h1>Log in Form</h1>
      <form id="loginForm" onSubmit={onSubmit}>
        <label>Username</label>
        <input type="text" name="username" id="username" onChange={handleChange} value={login.username || ''}></input>
        <label>Password</label>
        <input type="password" name="password" id="password" onChange={handleChange} value={login.password || ''}></input>
        <button>Login</button>
      </form>
    </div>
  );
};

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
}

export default LoginForm;
