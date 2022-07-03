import * as api from '../api';
import {
  CREATE_POST,
  DELETE_POST,
  FETCH_POSTS,
  LIKE_POST,
  UPDATE_POST,
} from '../types';

/**
 * We're using the async/await syntax to make an API call to fetchPosts() and then dispatching an
 * action with the data we get back
 */
export const getPosts = () => async dispatch => {
  try {
    const { data } = await api.fetchPosts();
    dispatch({ type: FETCH_POSTS, payload: data });
  } catch (err) {
    console.log(err);
  }
};

/**
 * CreatePost is a function that takes a post as an argument and returns a function that takes a
 * dispatch as an argument and dispatches an action to the reducer.
 */
export const createPost = post => async dispatch => {
  try {
    const { data } = await api.createPost(post);

    dispatch({ type: CREATE_POST, payload: data });
  } catch (err) {
    console.log(err);
  }
};

/**
 * It takes a post object as an argument, makes an API call to update the post, and then dispatches an
 * action to update the post in the Redux store
 */
export const updatePost = post => async dispatch => {
  try {
    const { data } = await api.updatePost(post);
    dispatch({ type: UPDATE_POST, payload: data });
  } catch (err) {
    console.log(err);
  }
};

/**
 * When the deletePost action creator is called, it will make an API request to delete the post with
 * the given id, and then dispatch an action with the type DELETE_POST and the id of the deleted post.
 */
export const deletePost = id => async dispatch => {
  try {
    await api.deletePost(id);

    dispatch({ type: DELETE_POST, payload: id });
  } catch (err) {
    console.log(err);
  }
};

/**
 * "When the user clicks the like button, we want to make a request to the server to like the post, and
 * then update the state to reflect that the post has been liked."
 *
 * The first thing we do is call the likePost function from the api.js file. This function returns a
 * promise, so we can use the await keyword to wait for the promise to resolve
 */
export const likePost = id => async dispatch => {
  try {
    await api.likePost(id);
    dispatch({ type: LIKE_POST, payload: id });
  } catch (err) {
    console.log(err);
  }
};
