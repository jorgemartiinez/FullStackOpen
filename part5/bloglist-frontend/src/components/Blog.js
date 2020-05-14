import React, { useState } from 'react';

import PropTypes from 'prop-types';

const Blog = ({ blog, handleAddLike, handleRemove, userId }) => {
  const [showAll, setShowAll] = useState(false);
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  const addLike = async () => {
    blog.likes++;
    await handleAddLike(blog);
  };

  const remove = async (id) => {
    if (window.confirm(`Are you sure that you want to delete the blog ${blog.title}?`)) {
      await handleRemove(id);
    }
  };

  if (!showAll) {
    return (
      <div style={blogStyle}>
        {blog.title}{' '}
        <button
          onClick={() => {
            setShowAll(true);
          }}
        >
          View
        </button>
      </div>
    );
  } else {
    console.log(blog);
    console.log(userId);
    return (
      <div style={blogStyle}>
        {blog.title} <br /> {blog.author} <br /> {blog.url} <br /> {blog.likes}
        <button onClick={addLike}>Like</button> <br />
        {blog.user.id === userId ? (
          <button
            onClick={() => {
              remove(blog.id);
            }}
          >
            Remove
          </button>
        ) : null}
        <button
          onClick={() => {
            setShowAll(false);
          }}
        >
          Hide
        </button>
      </div>
    );
  }
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleAddLike: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
};
export default Blog;
