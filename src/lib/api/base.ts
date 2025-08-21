import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000', // Sin /api al final
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para request
api.interceptors.request.use(config => {
  // Puedes añadir lógica común aquí (ej: headers de autenticación)
  return config;
});

// Interceptor para response
api.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export default api;