import { SET_COMPANIES, MODIFY_COMPANY } from './../types';
import { apiGetCompanies } from './../../utils/api';

export function getCompanies() {
  return dispatch => {
    apiGetCompanies().then(response => {
      dispatch(setCompanies(response.data.companies));
    });
  };
}

export function setCompanies(companies) {
  return {
    type: SET_COMPANIES,
    companies
  };
}

export function modifyCompany(id, name) {
  return {
    type: MODIFY_COMPANY,
    id,
    name
  };
}
