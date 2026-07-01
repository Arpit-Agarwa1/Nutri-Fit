import Product from '../schemas/Product.js';

/** Product model — MongoDB data access */
class ProductModel {
  /**
   * Get all products with optional filters
   * @param {Object} filters - texture, flavor, search
   * @returns {Promise<Array>} Filtered products
   */
  static async getAll(filters = {}) {
    const query = {};

    if (filters.texture) {
      query.texture = new RegExp(`^${filters.texture}$`, 'i');
    }

    if (filters.flavor) {
      query.flavor = new RegExp(`^${filters.flavor}$`, 'i');
    }

    let products = await Product.find(query).lean();

    if (filters.search) {
      const term = filters.search.toLowerCase();
      products = products.filter(
        (p) =>
          p.name.toLowerCase().includes(term) ||
          p.description.toLowerCase().includes(term) ||
          p.texture.toLowerCase().includes(term)
      );
    }

    return products.map(({ _id, ...rest }) => rest);
  }

  /** Get single product by business ID */
  static async getById(id) {
    const product = await Product.findOne({ id }).lean();
    if (!product) return null;
    const { _id, ...rest } = product;
    return rest;
  }

  /** Get single product by slug */
  static async getBySlug(slug) {
    const product = await Product.findOne({ slug }).lean();
    if (!product) return null;
    const { _id, ...rest } = product;
    return rest;
  }
}

export default ProductModel;
