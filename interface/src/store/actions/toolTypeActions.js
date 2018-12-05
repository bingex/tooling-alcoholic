import { GET_TOOL_TYPES } from './../types';
import { apiGetToolTypes } from './../../utils/api';

export function getToolTypes() {
  return dispatch => {
    apiGetToolTypes().then(response => {
      setToolTypes(response.data.tool_types);
    });
  };
}

export function setToolTypes(types) {
  return {
    type: GET_TOOL_TYPES,
    types
  };
}
