import axios from 'axios';
import { SERVER_URL } from '../config/vars';

export const apiClient: any = axios.create({
  // URL para variable de entorno
  baseURL: SERVER_URL
});

const privApiClient: any = axios.create({
  baseURL: SERVER_URL
});

privApiClient.interceptors.request.use((config: any) => {
  const token = localStorage.getItem('token');

  if (!token) return config;

  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export { privApiClient };
