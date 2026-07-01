import {
  filterProducts,
  getProductById,
  getProductBySlug,
} from '../data/productStore.js';

const API_BASE = import.meta.env.VITE_API_URL || '/api';

/**
 * Generic API fetch wrapper with static fallback support
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

/** Try API request, return null on failure */
const tryApi = async (fetcher) => {
  try {
    return await fetcher();
  } catch {
    return null;
  }
};

/** Product API service with static fallback for Vercel */
export const productService = {
  getAll: async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    const apiResult = await tryApi(() =>
      apiFetch(`/products${query ? `?${query}` : ''}`)
    );

    if (apiResult) return apiResult;

    const data = filterProducts(params);
    return { success: true, data, count: data.length };
  },

  getById: async (id) => {
    const apiResult = await tryApi(() => apiFetch(`/products/${id}`));
    if (apiResult) return apiResult;

    const product = getProductById(id);
    if (!product) throw new Error('Product not found');
    return { success: true, data: product };
  },

  getBySlug: async (slug) => {
    const apiResult = await tryApi(() => apiFetch(`/products/slug/${slug}`));
    if (apiResult) return apiResult;

    const product = getProductBySlug(slug);
    if (!product) throw new Error('Product not found');
    return { success: true, data: product };
  },
};

/** Order API service with client-side fallback */
export const orderService = {
  create: async (orderData) => {
    try {
      return await apiFetch('/orders', {
        method: 'POST',
        body: JSON.stringify(orderData),
      });
    } catch {
      // Client-side fallback when API unavailable
      let total = 0;
      const orderItems = orderData.items.map((item) => {
        const product = getProductById(item.productId);
        if (!product) throw new Error(`Product not found: ${item.productId}`);
        const quantity = item.quantity || 1;
        total += product.price * quantity;
        return {
          productId: product.id,
          name: product.name,
          price: product.price,
          quantity,
          subtotal: product.price * quantity,
        };
      });

      const order = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
        ...orderData,
        items: orderItems,
        total,
        status: 'pending',
        createdAt: new Date().toISOString(),
      };

      // Persist order locally for success page
      localStorage.setItem(`order_${order.id}`, JSON.stringify(order));

      return {
        success: true,
        message: 'Order placed successfully',
        data: order,
      };
    }
  },

  getById: async (id) => {
    const apiResult = await tryApi(() => apiFetch(`/orders/${id}`));
    if (apiResult) return apiResult;

    const stored = localStorage.getItem(`order_${id}`);
    if (stored) {
      return { success: true, data: JSON.parse(stored) };
    }

    throw new Error('Order not found');
  },
};

/** Contact API service */
export const contactService = {
  submit: async (formData) => {
    try {
      return await apiFetch('/contact', {
        method: 'POST',
        body: JSON.stringify(formData),
      });
    } catch {
      return {
        success: true,
        message: 'Thank you! We will get back to you soon.',
        data: { id: `${Date.now()}` },
      };
    }
  },
};
