import catalog from './products.json';

/** Static product catalog — single source of truth for frontend fallback */
export const products = catalog;

/**
 * Filter products by texture, flavor, category, or search query
 * @param {Object} filters
 * @returns {Array}
 */
export const filterProducts = (filters = {}) => {
  let result = [...products];

  if (filters.texture) {
    result = result.filter(
      (p) => p.texture.toLowerCase() === filters.texture.toLowerCase()
    );
  }

  if (filters.flavor) {
    result = result.filter(
      (p) => p.flavor?.toLowerCase() === filters.flavor.toLowerCase()
    );
  }

  if (filters.category) {
    result = result.filter(
      (p) => p.category?.toLowerCase() === filters.category.toLowerCase()
    );
  }

  if (filters.search) {
    const query = filters.search.toLowerCase();
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.shortDescription?.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.texture.toLowerCase().includes(query) ||
        p.flavor?.toLowerCase().includes(query) ||
        p.tags?.some((tag) => tag.toLowerCase().includes(query))
    );
  }

  return result.sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
};

/** Get product by ID */
export const getProductById = (id) => products.find((p) => p.id === id) || null;

/** Get product by slug */
export const getProductBySlug = (slug) => products.find((p) => p.slug === slug) || null;

/** Get featured products for homepage */
export const getFeaturedProducts = () =>
  products
    .filter((p) => p.isFeatured)
    .sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
