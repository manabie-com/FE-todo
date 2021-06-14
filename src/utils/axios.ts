import axios from 'axios';

const ins = axios.create({
  baseURL: 'http://localhost:5050',
  timeout: 10000,
});

ins.interceptors.request.use((request) => {
  request.headers.Authorization = localStorage.getItem('token');

  return request;
});

export default ins;
