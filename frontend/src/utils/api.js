import axios from 'axios';
import { API_BASE_URL, ERROR_MESSAGES } from './constants';

// Create axios instance with default configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle common errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response;
      
      switch (status) {
        case 401:
          // Unauthorized - clear token and redirect to login
          localStorage.removeItem('auth_token');
          localStorage.removeItem('user_data');
          window.location.href = '/login';
          break;
        case 403:
          error.message = ERROR_MESSAGES.UNAUTHORIZED;
          break;
        case 404:
          error.message = ERROR_MESSAGES.NOT_FOUND;
          break;
        case 500:
          error.message = ERROR_MESSAGES.SERVER_ERROR;
          break;
        default:
          error.message = data?.message || ERROR_MESSAGES.SERVER_ERROR;
      }
    } else if (error.request) {
      // Network error
      error.message = ERROR_MESSAGES.NETWORK_ERROR;
    } else {
      // Something else happened
      error.message = ERROR_MESSAGES.SERVER_ERROR;
    }
    
    return Promise.reject(error);
  }
);

// API methods
export const apiService = {
  // Authentication
  auth: {
    register: (userData) => api.post('/auth/register', userData),
    login: (credentials) => api.post('/auth/login', credentials),
    logout: () => api.post('/auth/logout'),
    getProfile: () => api.get('/auth/me'),
    updateProfile: (userData) => api.put('/auth/profile', userData),
    changePassword: (passwordData) => api.put('/auth/password', passwordData),
    forgotPassword: (email) => api.post('/auth/forgot-password', { email }),
    resetPassword: (token, password) => api.post(`/auth/reset-password/${token}`, { password }),
    verifyEmail: (token) => api.get(`/auth/verify-email/${token}`),
    resendVerification: () => api.post('/auth/resend-verification'),
    saveProperty: (propertyId) => api.post(`/auth/save-property/${propertyId}`),
    getSavedProperties: () => api.get('/auth/saved-properties'),
  },

  // Properties
  properties: {
    getAll: (params) => api.get('/properties', { params }),
    getById: (id) => api.get(`/properties/${id}`),
    create: (propertyData) => api.post('/properties', propertyData),
    update: (id, propertyData) => api.put(`/properties/${id}`, propertyData),
    delete: (id) => api.delete(`/properties/${id}`),
    getFeatured: () => api.get('/properties/featured'),
    search: (searchParams) => api.get('/properties/search', { params: searchParams }),
    getSimilar: (id) => api.get(`/properties/${id}/similar`),
    getStats: () => api.get('/properties/stats'),
  },

  // Contact
  contact: {
    submit: (contactData) => api.post('/contact', contactData),
    getAll: (params) => api.get('/contact', { params }),
    getById: (id) => api.get(`/contact/${id}`),
    updateStatus: (id, status) => api.put(`/contact/${id}/status`, { status }),
    assign: (id, agentId) => api.put(`/contact/${id}/assign`, { agentId }),
    addResponse: (id, response) => api.post(`/contact/${id}/response`, { response }),
    addNote: (id, note) => api.post(`/contact/${id}/note`, { note }),
    delete: (id) => api.delete(`/contact/${id}`),
    getStats: () => api.get('/contact/stats'),
    getRecent: () => api.get('/contact/recent'),
    getAnalytics: () => api.get('/contact/analytics'),
    bulkUpdate: (updates) => api.put('/contact/bulk', updates),
    export: (params) => api.get('/contact/export', { params }),
  },

  // Admin
  admin: {
    getDashboard: () => api.get('/admin/dashboard'),
    getUsers: (params) => api.get('/admin/users', { params }),
    getUserById: (id) => api.get(`/admin/users/${id}`),
    createUser: (userData) => api.post('/admin/users', userData),
    updateUser: (id, userData) => api.put(`/admin/users/${id}`, userData),
    deleteUser: (id) => api.delete(`/admin/users/${id}`),
    toggleUserStatus: (id) => api.put(`/admin/users/${id}/toggle-status`),
    resetUserPassword: (id, password) => api.put(`/admin/users/${id}/reset-password`, { password }),
    getSystemSettings: () => api.get('/admin/settings'),
    updateSystemSettings: (settings) => api.put('/admin/settings', settings),
    getSystemLogs: (params) => api.get('/admin/logs', { params }),
  },
};

// File upload helper
export const uploadFile = async (file, type = 'image') => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('type', type);

  try {
    const response = await api.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Multiple file upload helper
export const uploadMultipleFiles = async (files, type = 'image') => {
  const formData = new FormData();
  
  files.forEach((file, index) => {
    formData.append(`files`, file);
  });
  formData.append('type', type);

  try {
    const response = await api.post('/upload/multiple', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Helper function to handle API errors
export const handleApiError = (error, showToast = true) => {
  const message = error.response?.data?.message || error.message || ERROR_MESSAGES.SERVER_ERROR;
  
  if (showToast && typeof window !== 'undefined' && window.toast) {
    window.toast.error(message);
  }
  
  console.error('API Error:', error);
  return message;
};

// Helper function to format API response
export const formatApiResponse = (response) => {
  return {
    data: response.data,
    status: response.status,
    message: response.data?.message || 'Success',
  };
};

// Helper function to create query string from object
export const createQueryString = (params) => {
  const searchParams = new URLSearchParams();
  
  Object.keys(params).forEach(key => {
    const value = params[key];
    if (value !== null && value !== undefined && value !== '') {
      if (Array.isArray(value)) {
        value.forEach(item => searchParams.append(key, item));
      } else {
        searchParams.append(key, value);
      }
    }
  });
  
  return searchParams.toString();
};

// Helper function to download file
export const downloadFile = async (url, filename) => {
  try {
    const response = await api.get(url, {
      responseType: 'blob',
    });
    
    const blob = new Blob([response.data]);
    const downloadUrl = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(downloadUrl);
  } catch (error) {
    handleApiError(error);
  }
};

export default api;