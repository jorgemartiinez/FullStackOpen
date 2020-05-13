import React from 'react';

const LoginForm = ({ handleLogin, setUsername, setPassword }) => {
  return (
    <div>
      <h1>Log in Form</h1>
      <form onSubmit={handleLogin}>
        <label>Username</label>
        <input type="text" onChange={(ev) => setUsername(ev.target.value)}></input>
        <label>Password</label>
        <input type="password" onChange={(ev) => setPassword(ev.target.value)}></input>
        <button>Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
