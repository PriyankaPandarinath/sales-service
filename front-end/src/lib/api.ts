import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from 'axios';

/**
 * FastAPI backend base URL
 * Make sure this matches your backend
 */
// const API_BASE_URL =
//   import.meta.env.VITE_API_URL || ' http://127.0.0.1:8000/api/v1';

const API_BASE_URL = 'https://sales-service-k2uv.onrender.com/api/v1';


/**
 * Axios instance
 */
const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
});

/**
 * REQUEST INTERCEPTOR
 * Automatically attach JWT token
 */
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

/**
 * RESPONSE INTERCEPTOR
 * Handle 401 globally (logout user)
 */
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Token invalid / expired
      localStorage.removeItem('token');
      localStorage.removeItem('user');

      // Optional redirect
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

/* ============================
   AUTH API
============================ */

export const authAPI = {
  login: (email: string, password: string) =>
    api.post('/auth/login', { email, password }),

  logout: () => api.post('/auth/logout'), // optional (can be stubbed)

  getProfile: () => api.get('/auth/me'), // future endpoint
};

/* ============================
   TYPES (aligned with backend)
============================ */

export interface User {
  id: number;
  email: string;
  role: string;
  name?: string;
  employeeId?: string;
  department?: string;
  designation?: string;
}

/* ============================
   PLACEHOLDERS FOR FUTURE APIs
   (Add when backend is ready)
============================ */

// export const employeeAPI = {
//   getAll: () => api.get('/employees'),
//   getById: (id: number) => api.get(`/employees/${id}`),
// };

// export const attendanceAPI = {
//   getMyAttendance: () => api.get('/attendance/me'),
// };

export default api;



export const attendanceAPI = {
  getMyAttendance: (params?: {
  page?: number;
  limit?: number;
  status?: string;
}) =>
  api.get('/attendance/me', { params }),


  getMyStats: () =>
    api.get('/attendance/stats'),

  punchIn: () =>
    api.post('/attendance/punch-in'),

  punchOut: () =>
    api.post('/attendance/punch-out'),
};

