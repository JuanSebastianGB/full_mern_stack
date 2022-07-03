import { combineReducers } from 'redux';
import { postsReducer as posts } from './postsReducer';
import { currentIdReducer as currentId } from './currentIdReducer';
import { authReducer as auth } from './authReducer';

/* Exporting the combined reducers. */
export default combineReducers({
  posts,
  currentId,
  auth,
});
