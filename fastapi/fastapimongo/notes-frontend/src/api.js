// api.js
const API_BASE_URL = 'http://localhost:8000';

const api = {
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || 'Something went wrong');
      }

      return data;
    } catch (error) {
      throw error;
    }
  },

  auth: {
    signup: (userData) => api.request('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(userData),
    }),
    login: (credentials) => api.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    }),
    logout: () => api.request('/auth/logout', { method: 'POST' }),
    getMe: () => api.request('/auth/me'),
  },

  notes: {
    getAll: () => api.request('/notes'),
    create: (noteData) => api.request('/notes', {
      method: 'POST',
      body: JSON.stringify(noteData),
    }),
    update: (id, noteData) => api.request(`/notes/${id}`, {
      method: 'PUT',
      body: JSON.stringify(noteData),
    }),
    delete: (id) => api.request(`/notes/${id}`, { method: 'DELETE' }),
    addComment: (id, comment) => api.request(`/notes/${id}/comments`, {
      method: 'POST',
      body: JSON.stringify(comment),
    }),
  },
};

export default api;
