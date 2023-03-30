import axios from 'axios';

const API_URL = 'https://newsapi.org';
const apiKey = 'd455bc535131474cb514d01b03cb0bf2';

const api = axios.create({
  baseURL: API_URL,
  responseType: 'json',
});

api.interceptors.request.use((config: any) => {
  config.params = {
    ...config.params,
    apiKey,
  };
  return config;
});

export default api;
