import {
  CREATE_POST,
  DELETE_POST,
  FETCH_POSTS,
  LIKE_POST,
  UPDATE_POST,
} from '../types';

/**
 * It returns a new array of posts, based on the action type
 * @param [state] - This is the current state of the application.
 * @param action - This is the action object that was dispatched.
 * @returns The state is being returned.
 */
export const postsReducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_POSTS:
      return action.payload;
    case CREATE_POST:
      return [...state, action.payload];
    case UPDATE_POST:
      return state.map(post =>
        post._id === action.payload._id ? action.payload : post
      );
    case DELETE_POST:
      return state.filter(post => post._id !== action.payload);
    case LIKE_POST:
      return state.map(post =>
        post._id === action.payload
          ? { ...post, likeCount: post.likeCount + 1 }
          : post
      );
    default:
      return state;
  }
};
