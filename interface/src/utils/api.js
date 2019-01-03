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

export function apiAddToolTypes(data) {
  return axios.post(`${API_URL}/api/tool_types`, data);
}

export function apiUpdateToolTypes(data) {
  return axios.put(`${API_URL}/api/tool_types/${data.id}`, data);
}

export function apiDeleteToolType(id) {
  return axios.delete(`${API_URL}/api/tool_types/${id}`);
}

export function apiGetCompanies() {
  return axios.get(`${API_URL}/api/companies`);
}

export function apiAddCompany(data) {
  return axios.post(`${API_URL}/api/companies`, data);
}

export function apiUpdateCompany(data) {
  return axios.put(`${API_URL}/api/companies/${data.id}`, data);
}

export function apiDeleteCompany(id) {
  return axios.delete(`${API_URL}/api/companies/${id}`);
}

export function apiGetUserTools(id) {
  return axios.get(`${API_URL}/api/tools/${id}`);
}

export function apiAddTool(data) {
  return axios.post(`${API_URL}/api/tools`, data);
}

export function apiUpdateTool(data) {
  return axios.put(`${API_URL}/api/tools/${data.id}`, data);
}
