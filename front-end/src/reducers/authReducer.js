import { AUTH, LOGOUT } from '../types';

export const authReducer = (state = { authData: null }, action) => {
  switch (action.type) {
    case AUTH:
      const toAddToStorage = { ...action?.data };
      const stringObj = JSON.stringify(toAddToStorage);
      localStorage.setItem('profile', stringObj);
      return {
        ...state,
        authenticated: true,
        authData: action?.data,
      };
    case LOGOUT:
      localStorage.clear();
      return {
        ...state,
        authenticated: false,
        authData: null,
      };
    default:
      return state;
  }
};
