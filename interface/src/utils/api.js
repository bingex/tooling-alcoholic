import axios from 'axios';

const API_URL = 'http://localhost:3000';

export function apiGetUser(indentificator) {
  return axios.get(`${API_URL}/api/users/${indentificator}`);
}

export function apiUserSignupRequest(data) {
  return axios.post(`${API_URL}/api/users`, data);
}
