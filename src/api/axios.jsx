// src/api/axios.js
import axios from 'axios';
import config from '../config';

const instance = axios.create({
  baseURL: config.apiBaseUrl,
  withCredentials: true, // ใส่ถ้าคุณใช้ cookies ร่วมด้วย
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

export default instance;
