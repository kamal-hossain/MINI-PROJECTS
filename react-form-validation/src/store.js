import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension'; 
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const initialState = {};

const middleware = [thunk];

/**
 * @description - creating Redux store with 'redux', 'redux-devtools-extention' and 'redux-thunk'
 * 'redux-thunk' let you write async logic that interacts with the store.
 */
const store = createStore(
  rootReducer, // Combinig all reducers from ./reducers/index.js 
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
