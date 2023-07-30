import axios from 'axios';

export interface ResponseData<T> {
  code: number;
  data: T;
  message: string;
}

export interface Pagination<T> {
  content: T;
  size: number;
  number: number;
  numberOfElements: number;
  totalElements: number;
  totalPages: number;
}

const api = axios.create({
  withCredentials: false,
  baseURL: process.env.REACT_APP_API_BASE_URL + '/api/v1',
  headers: {
    'x-ncp-apigw-api-key': process.env.REACT_APP_API_KEY,
  },
});

api.interceptors.request.use(
  function (config) {
    console.log('[REQUEST]:', config.method, config.baseURL);
    return config;
  },
  function (error) {
    console.error('[REQUEST]:', JSON.stringify(error));
  },
);

api.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    console.error('[RESPONSE]:', JSON.stringify(error));
  },
);

export default api;
