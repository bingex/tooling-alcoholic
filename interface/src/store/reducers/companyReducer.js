import { SET_COMPANIES } from './../types';

const initialState = {
  companies: []
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_COMPANIES:
      return {
        ...state,
        companies: action.companies
      };
    default:
      return state;
  }
};
