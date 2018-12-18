import { GET_TOOL_TYPES, ADD_NEW_TOOL_TYPE } from './../types';
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
    type: GET_TOOL_TYPES,
    types
  };
}

export function addNewToolType(id, name, picture) {
  return {
    type: ADD_NEW_TOOL_TYPE,
    id,
    name,
    picture
  };
}
