import { SET_ERRORS } from './../types';
import { toast } from 'react-toastify';

const initialState = {
  errors: []
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_ERRORS:
      const errorsKeys = Object.keys(action.errors);

      if (errorsKeys.length) {
        const errorsString = errorsKeys
          .map(item => action.errors[item])
          .join('. ');
        toast.error(errorsString, {
          position: toast.POSITION.BOTTOM_LEFT
        });
      }

      return {
        ...state,
        errors: action.errors
      };
    default:
      return state;
  }
};
