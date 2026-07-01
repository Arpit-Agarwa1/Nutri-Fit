const API_BASE = '/api';

/**
 * Generic API fetch wrapper with error handling
 * @param {string} endpoint - API endpoint
 * @param {Object} options - Fetch options
 * @returns {Promise<Object>} API response
 */
const apiFetch = async (endpoint, options = {}) => {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong');
  }

  return data;
};

/** Product API service */
export const productService = {
  getAll: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return apiFetch(`/products${query ? `?${query}` : ''}`);
  },
  getById: (id) => apiFetch(`/products/${id}`),
  getBySlug: (slug) => apiFetch(`/products/slug/${slug}`),
};

/** Order API service */
export const orderService = {
  create: (orderData) =>
    apiFetch('/orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
    }),
  getById: (id) => apiFetch(`/orders/${id}`),
};

/** Contact API service */
export const contactService = {
  submit: (formData) =>
    apiFetch('/contact', {
      method: 'POST',
      body: JSON.stringify(formData),
    }),
};
