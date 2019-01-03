import { SET_USER_TOOLS, MODIFY_TOOL, REMOVE_TOOL } from './../types';

const initialState = {
  userTools: []
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_USER_TOOLS:
      return {
        ...state,
        userTools: action.tools
      };
    case MODIFY_TOOL:
      const { name, id, tool_type_id, user_id, picture } = action;
      const isUpdating = state.userTools.find(item => item.id == id);

      return {
        ...state,
        userTools: isUpdating
          ? state.userTools.map(item =>
              item.id == id
                ? { name, id, tool_type_id, user_id, picture }
                : item
            )
          : [...state.userTools, { name, id, tool_type_id, user_id, picture }]
      };

    case REMOVE_TOOL:
      return {
        ...state,
        userTools: state.userTools.filter(item => item.id !== action.id)
      };
    default:
      return state;
  }
};
