import { CLEAR_CURRENT_ID, SET_CURRENT_ID } from '../types';

export const currentIdReducer = (state = 0, action) => {
  switch (action.type) {
    case SET_CURRENT_ID:
      return action.payload;
    case CLEAR_CURRENT_ID:
      return 0;
    default:
      return state;
  }
};
