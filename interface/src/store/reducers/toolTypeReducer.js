import {
  GET_TOOL_TYPES,
  ADD_NEW_TOOL_TYPE,
  REMOVE_TOOL_TYPE
} from './../types';

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
      const { name, picture, id } = action;
      return {
        ...state,
        types: [...state.types, { name, picture, id }]
      };
    case REMOVE_TOOL_TYPE:
      return {
        ...state,
        types: state.types.filter(item => item.id !== action.id)
      };
    default:
      return state;
  }
};
