import axios from 'axios';

const authClient = axios.create({
  baseURL: import.meta.env.VITE_LOGIN_URL,
  timeout: 5000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default authClient;
