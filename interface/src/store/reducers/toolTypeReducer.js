import { GET_TOOL_TYPES, ADD_NEW_TOOL_TYPE } from './../types';

const initialState = {
  types: []
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case GET_TOOL_TYPES:
      return {
        ...state,
        types: action.types
      };
    case ADD_NEW_TOOL_TYPE:
      return {
        types: [...state.types, { name: action.name }]
      };
    default:
      return state;
  }
};
