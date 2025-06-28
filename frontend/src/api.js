import axios from 'axios';
import { API_BASE_URL } from './config';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export function getUsers(params) {
  // params = { Id: 1, Name: 'RIVKAH', Phone: '0537654321' }
  return api.post('/User/exists', null, { params });
}
export function getAdminUsers() {
  return api.get('/Admin/users');
}