import { SET_COMPANIES, MODIFY_COMPANY, REMOVE_COMPANY } from './../types';

const initialState = {
  companies: []
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_COMPANIES:
      return {
        ...state,
        companies: action.companies
      };
    case MODIFY_COMPANY:
      const { name, id } = action;
      const isUpdating = state.companies.find(item => item.id == id);

      return {
        ...state,
        companies: isUpdating
          ? state.companies.map(item => (item.id == id ? { name, id } : item))
          : [...state.companies, { name, id }]
      };

    case REMOVE_COMPANY:
      return {
        ...state,
        companies: state.companies.filter(item => item.id !== action.id)
      };
    default:
      return state;
  }
};
