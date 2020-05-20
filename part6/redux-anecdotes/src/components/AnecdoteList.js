import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { vote } from '../store/reducers/anecdoteReducer';
import { show, hide } from '../store/reducers/notificationReducer';

function AnecdoteList() {
  const dispatch = useDispatch();
  const anecdotes = useSelector((state) => {
    console.log('display statate selector', state);
    let notes = state.anecdotes.sort((a, b) => (a.votes > b.votes ? -1 : 1));
    if (state.filter.length > 0) {
      notes = notes.filter((note) => note.content.toLowerCase().trim().includes(state.filter.toLowerCase().trim()));
    }
    return notes;
  });

  const addVote = (anecdote) => {
    dispatch(vote(anecdote));
    dispatch(show(`Vote added correctly to - ${anecdote.content}`, 2));
  };

  return (
    <>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => addVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
}

export default AnecdoteList;
