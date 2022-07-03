import { CLEAR_CURRENT_ID, SET_CURRENT_ID } from '../types';

/**
 * It returns an object with a type property and a payload property
 */
export const setCurrentId = id => dispatch =>
  dispatch({ type: SET_CURRENT_ID, payload: id });

/**
 * It dispatches an action to the Redux store that clears the currentId
 */
export const clearCurrentId = () => dispatch =>
  dispatch({ type: CLEAR_CURRENT_ID });
