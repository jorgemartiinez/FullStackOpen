import { reducer as anecdoteReducer } from './reducers/anecdoteReducer';
import { reducer as notificationReducer } from './reducers/notificationReducer';
import { reducer as filterReducer } from './reducers/filterReducer';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

const allReducers = combineReducers({ anecdotes: anecdoteReducer, notification: notificationReducer, filter: filterReducer });

const store = createStore(allReducers, composeWithDevTools(applyMiddleware(thunk)));
store.getState();
export default store;
