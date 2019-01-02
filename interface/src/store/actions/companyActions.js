import { SET_COMPANIES } from './../types';
import { apiGetCompanies } from './../../utils/api';

export function getCompanies() {
  return dispatch => {
    apiGetCompanies().then(response => {
      dispatch(setCompanies(response.data.tool_types));
    });
  };
}

export function setCompanies(companies) {
  return {
    type: SET_COMPANIES,
    companies
  };
}
