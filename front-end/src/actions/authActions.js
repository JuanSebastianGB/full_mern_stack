import {
  AUTH,
  CLEAR_FORM_DATA,
  FILL_FORM_DATA,
  LOGOUT,
  SIGN_IN,
  SIGN_UP,
} from '../types';

/**
 * It returns an object with a type property and a data property
 */
export const authenticate = (result, token) => ({
  type: AUTH,
  data: { result, token },
});

/**
 * It returns an object with a type property set to LOG_OUT
 */
export const logoutUser = () => ({ type: LOGOUT });

/**
 * It takes in a dispatch function as an argument, and then dispatches an action object with a type of
 * SIGN_IN
 */
export const signIn = (data, navigate) => async dispatch => {
  try {
    dispatch({ type: SIGN_IN, payload: data });
    navigate('/');
  } catch (err) {
    console.log(err);
  }
};

/**
 * It's a function that takes in a dispatch function as an argument and returns a function that
 * dispatches an action object with a type of SIGN_UP
 */
export const signUp = (data, navigate) => async dispatch => {
  try {
    dispatch({ type: SIGN_UP, payload: data });
    navigate('/');
  } catch (err) {
    console.log(err);
  }
};

/**
 * It returns an object with a type property set to CLEAR_FORM_DATA
 */
export const clearFormData = () => ({ type: CLEAR_FORM_DATA });

/**
 * It returns an object with a type property and a payload property
 */
export const fillFormData = data => ({ type: FILL_FORM_DATA, payload: data });
