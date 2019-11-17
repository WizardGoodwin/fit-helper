import axios from 'axios';

import { getCookie } from './cookie';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

instance.interceptors.request.use(request => {
  const token = getCookie('fitHelperToken');
  if (token) {
    request.headers.Authorization = token;
  }
  return request;
});

// handling 401 error for all guarded requests
instance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    const { response } = error;
    console.log(response);
    if (response) {
      if (response.status === 401) {
        // redirect to sign in if user is not authenticated
        // window.location = '/auth/sign-in';
      } else if (response.status >= 500) {
        console.log('Status: ', error.response.status);
        console.log('StatusText: ', error.response.statusText);
        console.log('Data: ', error.response.data);
      }
    }
    return Promise.reject(error.response.data.error);
  },
);

export default instance;
