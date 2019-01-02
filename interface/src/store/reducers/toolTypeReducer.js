import { SET_TOOL_TYPES, MODIFY_TOOL_TYPE, REMOVE_TOOL_TYPE } from './../types';

const initialState = {
  types: []
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_TOOL_TYPES:
      return {
        ...state,
        types: action.types
      };
    case MODIFY_TOOL_TYPE:
      const { name, picture, id } = action;
      const isUpdating = state.types.find(item => item.id == id);

      return {
        ...state,
        types: isUpdating
          ? state.types.map(
              item => (item.id == id ? { name, picture, id } : item)
            )
          : [...state.types, { name, picture, id }]
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
