import { combineReducers } from 'redux';
import { postsReducer as posts } from './postsReducer';
import { currentIdReducer as currentId } from './currentIdReducer';

/* Exporting the combined reducers. */
export default combineReducers({
  posts,
  currentId,
});
