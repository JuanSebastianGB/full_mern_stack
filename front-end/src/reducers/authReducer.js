import { AUTH, CLEAR_FORM_DATA, FILL_FORM_DATA, LOGOUT } from '../types';

/* Setting the initial state of the form data. */
const initialFormData = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
};
/**
 * It takes in a state and an action, and returns a new state based on the action
 * @param [state] - This is the current state of the reducer.
 * @param action - This is the action that is dispatched from the component.
 * @returns The state is being returned.
 */
export const authReducer = (
  state = { authData: null, formData: initialFormData },
  action
) => {
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
    case CLEAR_FORM_DATA:
      return {
        ...state,
        formData: { ...initialFormData },
      };
    case FILL_FORM_DATA:
      return {
        ...state,
        formData: { ...action?.payload },
      };
    default:
      return state;
  }
};
