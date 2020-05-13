import React, { useState } from 'react';

const AddBlog = ({ setBlog, handleAddBlog }) => {
  const handleChange = ({ target }) => {
    console.log('change', target.name);
    switch (target.name) {
      case 'title':
        setBlog((prevState) => ({ ...prevState, title: target.value }));
        break;
      case 'url':
        setBlog((prevState) => ({ ...prevState, url: target.value }));
        break;
      case 'author':
        setBlog((prevState) => ({ ...prevState, author: target.value }));
        break;
      default:
        return;
    }
  };

  return (
    <div>
      <form onSubmit={handleAddBlog}>
        <label htmlFor="title">Title</label>
        <input type="text" onChange={handleChange} name="title" id="title"></input>
        <label htmlFor="author">Author</label>
        <input type="text" onChange={handleChange} name="author" id="author"></input>
        <label htmlFor="url">Url</label>
        <input type="text" onChange={handleChange} name="url" id="url"></input>
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default AddBlog;
