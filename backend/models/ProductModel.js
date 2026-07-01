import { readData } from '../config/database.js';

/** Product model - handles product data access */
class ProductModel {
  /**
   * Get all products with optional filters
   * @param {Object} filters - texture, flavor, search
   * @returns {Array} Filtered products
   */
  static getAll(filters = {}) {
    let products = readData('products.json');

    if (filters.texture) {
      products = products.filter(
        (p) => p.texture.toLowerCase() === filters.texture.toLowerCase()
      );
    }

    if (filters.flavor) {
      products = products.filter(
        (p) => p.flavor?.toLowerCase() === filters.flavor.toLowerCase()
      );
    }

    if (filters.search) {
      const query = filters.search.toLowerCase();
      products = products.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.texture.toLowerCase().includes(query)
      );
    }

    return products;
  }

  /** Get single product by ID */
  static getById(id) {
    const products = readData('products.json');
    return products.find((p) => p.id === id) || null;
  }

  /** Get single product by slug */
  static getBySlug(slug) {
    const products = readData('products.json');
    return products.find((p) => p.slug === slug) || null;
  }
}

export default ProductModel;
