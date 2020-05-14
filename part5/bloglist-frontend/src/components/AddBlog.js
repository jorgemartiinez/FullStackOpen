import React, { useState } from 'react';
import PropTypes from 'prop-types';

const AddBlog = ({ handleAddBlog }) => {
  const [newBlog, setNewBlog] = useState({});

  const handleChange = ({ target }) => {
    let name = target.name;
    let value = target.value;
    const changeBlog = newBlog;
    changeBlog[name] = value;
    setNewBlog({ ...changeBlog });
  };

  const addBlog = async (ev) => {
    ev.preventDefault();
    await handleAddBlog(newBlog);
    setNewBlog({});
  };

  return (
    <div>
      <form id="addBlog" onSubmit={addBlog}>
        <label htmlFor="title">Title</label>
        <input type="text" onChange={handleChange} value={newBlog.title || ''} name="title" id="title"></input>
        <label htmlFor="author">Author</label>
        <input type="text" onChange={handleChange} value={newBlog.author || ''} name="author" id="author"></input>
        <label htmlFor="url">Url</label>
        <input type="text" onChange={handleChange} value={newBlog.url || ''} name="url" id="url"></input>
        <button type="submit">Add</button>
      </form>
    </div>
  );
};
AddBlog.propTypes = {
  handleAddBlog: PropTypes.func.isRequired,
};
export default AddBlog;
