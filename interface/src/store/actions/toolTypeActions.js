import { SET_TOOL_TYPES, MODIFY_TOOL_TYPE, REMOVE_TOOL_TYPE } from './../types';
import { apiGetToolTypes } from './../../utils/api';

export function getToolTypes() {
  return dispatch => {
    apiGetToolTypes().then(response => {
      dispatch(setToolTypes(response.data.tool_types));
    });
  };
}

export function setToolTypes(types) {
  return {
    type: SET_TOOL_TYPES,
    types
  };
}

export function modifyToolType(id, name, picture) {
  return {
    type: MODIFY_TOOL_TYPE,
    id,
    name,
    picture
  };
}

export function removeToolType(id) {
  return {
    type: REMOVE_TOOL_TYPE,
    id
  };
}
