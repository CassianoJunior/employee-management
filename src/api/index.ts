import axios from 'axios';

const apiInstance = (baseUrl: string) => {
  const instance = axios.create({
    baseURL: baseUrl,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return instance;
};

export { apiInstance };
