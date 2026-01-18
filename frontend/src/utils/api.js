// Centralized API utility
import { API_BASE_URL } from './constants';

/**
 * Get authorization headers with token
 */
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  };
};

/**
 * Generic API call wrapper
 */
const apiCall = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const config = {
    ...options,
    headers: {
      ...getAuthHeaders(),
      ...options.headers
    }
  };

  const response = await fetch(url, config);
  return response;
};

/**
 * API methods
 */
export const api = {
  // Auth endpoints
  auth: {
    register: (data) => apiCall('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data)
    }),
    login: (data) => apiCall('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data)
    }),
    googleAuth: (data) => apiCall('/auth/google', {
      method: 'POST',
      body: JSON.stringify(data)
    }),
    getMe: () => apiCall('/auth/me'),
    updateProfile: (data) => apiCall('/auth/profile', {
      method: 'PUT',
      body: JSON.stringify(data)
    }),
    changePassword: (data) => apiCall('/auth/change-password', {
      method: 'PUT',
      body: JSON.stringify(data)
    })
  },

  // Properties endpoints
  properties: {
    getAll: (params) => {
      const query = params ? `?${new URLSearchParams(params)}` : '';
      return apiCall(`/properties${query}`);
    },
    getById: (id) => apiCall(`/properties/${id}`),
    create: (data) => apiCall('/properties', {
      method: 'POST',
      body: JSON.stringify(data)
    }),
    update: (id, data) => apiCall(`/properties/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    }),
    delete: (id) => apiCall(`/properties/${id}`, {
      method: 'DELETE'
    })
  },

  // Wishlist endpoints
  wishlist: {
    getAll: () => apiCall('/wishlist'),
    toggle: (propertyId) => apiCall(`/wishlist/toggle/${propertyId}`, {
      method: 'PUT'
    }),
    remove: (propertyId) => apiCall(`/wishlist/${propertyId}`, {
      method: 'DELETE'
    })
  },

  // User endpoints
  user: {
    getProfile: () => apiCall('/user/profile'),
    updateProfile: (data) => apiCall('/user/profile', {
      method: 'PUT',
      body: JSON.stringify(data)
    }),
    getInsights: () => apiCall('/user/insights')
  },

  // Site visits endpoints
  siteVisits: {
    getAll: () => apiCall('/sitevisits'),
    create: (data) => apiCall('/sitevisits', {
      method: 'POST',
      body: JSON.stringify(data)
    }),
    update: (id, data) => apiCall(`/sitevisits/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    }),
    delete: (id) => apiCall(`/sitevisits/${id}`, {
      method: 'DELETE'
    })
  },

  // Projects endpoints
  projects: {
    getAll: (params) => {
      const query = params ? `?${new URLSearchParams(params)}` : '';
      return apiCall(`/projects${query}`);
    },
    getById: (id) => apiCall(`/projects/${id}`),
    create: (data) => apiCall('/projects', {
      method: 'POST',
      body: JSON.stringify(data)
    }),
    update: (id, data) => apiCall(`/projects/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    }),
    delete: (id) => apiCall(`/projects/${id}`, {
      method: 'DELETE'
    })
  },

  // Blogs endpoints
  blogs: {
    getAll: (params) => {
      const query = params ? `?${new URLSearchParams(params)}` : '';
      return apiCall(`/blogs${query}`);
    },
    getById: (id) => apiCall(`/blogs/${id}`),
    create: (data) => apiCall('/blogs', {
      method: 'POST',
      body: JSON.stringify(data)
    }),
    update: (id, data) => apiCall(`/blogs/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    }),
    delete: (id) => apiCall(`/blogs/${id}`, {
      method: 'DELETE'
    })
  },

  // Contact endpoints
  contact: {
    submit: (data) => apiCall('/contact', {
      method: 'POST',
      body: JSON.stringify(data)
    })
  },

  // Leads endpoints
  leads: {
    getAll: () => apiCall('/leads'),
    create: (data) => apiCall('/leads', {
      method: 'POST',
      body: JSON.stringify(data)
    }),
    update: (id, data) => apiCall(`/leads/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    }),
    delete: (id) => apiCall(`/leads/${id}`, {
      method: 'DELETE'
    })
  },

  // Page content endpoints
  pageContent: {
    getAll: () => apiCall('/page-content'),
    getByPage: (page) => apiCall(`/page-content/${page}`),
    update: (page, data) => apiCall(`/page-content/${page}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    })
  },

  // Setup endpoints
  setup: {
    createAdmin: (data) => apiCall('/setup/create-admin', {
      method: 'POST',
      body: JSON.stringify(data)
    })
  }
};

export default api;
