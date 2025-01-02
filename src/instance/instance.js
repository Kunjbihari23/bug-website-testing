// services/api.js
import axios from 'axios';
import { getAccessToken } from './getAccessToken';
import { signOut } from 'next-auth/react';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
  headers: {
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': '69420',
    // 'Content-Type': 'multipart/form-data',
  },
});

instance.interceptors.request.use(
  async (config) => {
    const session = await getAccessToken();
    if (session) {
      config.headers.Authorization = `Bearer ${session}`;
    }

    return config;
  },
  (error) => {
    console.log(error, 'error');
    return error;
  }
);

//Interceptor to handle 401 Unauthorized responses
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.data.status == 401) {
      await signOut();
      window.location.href = '/';
      window.location.reload();
    }
    return error;
  }
);

export default instance;
