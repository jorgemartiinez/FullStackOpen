import React from 'react';
import { useDispatch } from 'react-redux';
import { add } from '../store/reducers/anecdoteReducer';
import { show, hide } from '../store/reducers/notificationReducer';

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addAnecdote = async (ev) => {
    ev.preventDefault();
    const content = ev.target.content.value;
    dispatch(add(content));
    dispatch(show(`new added`, 5));
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
