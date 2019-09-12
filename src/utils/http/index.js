/* eslint-disable no-param-reassign */
/**
 * An axios proxy to attach the base url and authentication token
 */
import axios from 'axios';

const http = axios.create({
  baseURL: process.env.API_ROUTE
});

http.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;

  return config;
});

http.interceptors.response.use((response) => response?.data, (error) => error);

export default http;
