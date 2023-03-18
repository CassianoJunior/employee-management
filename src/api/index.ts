import axios from 'axios';

const api = axios.create({
  baseURL: 'https://employee-api-gx8v.onrender.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

export { api };
