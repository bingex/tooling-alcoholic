import { SET_CURRENT_USER } from './../types';
import isEmpty from 'lodash/isEmpty';

const initialState = {
  isAuthenticated: false,
  user: {}
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      const { user } = action;
      return {
        ...state,
        isAuthenticated: !isEmpty(user),
        user: user
      };
    default:
      return state;
  }
};
