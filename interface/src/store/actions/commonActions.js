import { SET_ERRORS } from './../types';

export function setErrors(errors) {
  return {
    type: SET_ERRORS,
    errors
  };
}
