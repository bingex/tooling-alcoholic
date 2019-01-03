import { SET_USER_TOOLS, MODIFY_TOOL } from './../types';
import { apiGetUserTools } from './../../utils/api';

export function getUserTools(id) {
  return dispatch => {
    apiGetUserTools(id).then(response => {
      dispatch(setUserTools(response.data.tools));
    });
  };
}

export function setUserTools(tools) {
  return {
    type: SET_USER_TOOLS,
    tools
  };
}

export function modifyTool(id, name, tool_type, user_id) {
  return {
    type: MODIFY_TOOL,
    id,
    name,
    tool_type,
    user_id
  };
}
