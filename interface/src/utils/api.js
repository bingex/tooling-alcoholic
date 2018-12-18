import axios from 'axios';

const API_URL = 'http://localhost:3000';

export function apiGetUser(identifier) {
  return axios.get(`${API_URL}/api/users/${identifier}`);
}

export function apiUserSignupRequest(data) {
  return axios.post(`${API_URL}/api/users`, data);
}

export function apiLogin(data) {
  return axios.post(`${API_URL}/api/auth`, data);
}

export function apiGetToolTypes() {
  return axios.get(`${API_URL}/api/tool_types`);
}

export function apiSetToolTypes(data) {
  return axios.post(`${API_URL}/api/tool_types`, data);
}

export function apiDeleteToolType(id) {
  return axios.delete(`${API_URL}/api/tool_types/${id}`);
}
