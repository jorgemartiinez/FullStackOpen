import anecdotesService from '../../services/anecdotes';

const asObject = (anecdote) => {
  return {
    content: anecdote,
    votes: 0,
  };
};

// * REDUCER
const reducer = (state = [], action) => {
  switch (action.type) {
    case 'INITIALIZE':
      return action.payload.anecdotes;
    case 'VOTE':
      let changedAnecdotes = [...state];
      const id = action.payload.id;
      changedAnecdotes.map((state) => {
        if (state.id === id) {
          state.votes++;
        }
        return state;
      });
      return changedAnecdotes;
    case 'ADD':
      const newAnecdote = { ...action.payload.newAnecdote };
      return state.concat(newAnecdote);
    default:
      return state;
  }
};

// * ACTIONS

const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdotesService.getAll();
    dispatch({
      type: 'INITIALIZE',
      payload: { anecdotes },
    });
  };
};

const vote = (anecdote) => {
  return async (dispatch) => {
    const updatedAnecdote = await anecdotesService.putVote({ ...anecdote, votes: anecdote.votes + 1 });
    dispatch({
      type: 'VOTE',
      payload: { id: updatedAnecdote.id },
    });
  };
};

const add = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdotesService.addNew(content);
    dispatch({
      type: 'ADD',
      payload: { newAnecdote },
    });
  };
};

export { initializeAnecdotes, vote, reducer, add };
