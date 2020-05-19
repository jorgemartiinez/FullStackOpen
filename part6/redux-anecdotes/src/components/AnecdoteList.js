import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { vote } from '../reducers/anecdoteReducer';

function AnecdoteList() {
  const dispatch = useDispatch();
  const anecdotes = useSelector((state) => state.sort((a, b) => (a.votes > b.votes ? -1 : 1)));

  const addVote = (id) => {
    dispatch(vote(id));
  };

  return (
    <>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => addVote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
}

export default AnecdoteList;
