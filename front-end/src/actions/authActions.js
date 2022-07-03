import { AUTH, LOGOUT } from '../types';

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
