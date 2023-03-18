import axios from 'axios';

const api = axios.create({
  baseURL: 'https://employee-api-jnef.onrender.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

export { api };
