import React from 'react';
import { useDispatch } from 'react-redux';
import { add } from '../reducers/anecdoteReducer';
const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addAnecdote = (ev) => {
    ev.preventDefault();
    const content = ev.target.content.value;
    dispatch(add(content));
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="content" />
        </div>
        <button>create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
