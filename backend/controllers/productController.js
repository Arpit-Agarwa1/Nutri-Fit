import ProductModel from '../models/ProductModel.js';

/** Product controller — handles product HTTP requests */
class ProductController {
  /** GET /api/products */
  static async getAll(req, res) {
    try {
      const { texture, flavor, search } = req.query;
      const products = await ProductModel.getAll({ texture, flavor, search });
      res.json({ success: true, data: products, count: products.length });
    } catch (error) {
      console.error('getAll products error:', error.message);
      res.status(500).json({ success: false, message: 'Failed to fetch products' });
    }
  }

  /** GET /api/products/:id */
  static async getById(req, res) {
    try {
      const product = await ProductModel.getById(req.params.id);

      if (!product) {
        return res.status(404).json({ success: false, message: 'Product not found' });
      }

      res.json({ success: true, data: product });
    } catch (error) {
      console.error('getById product error:', error.message);
      res.status(500).json({ success: false, message: 'Failed to fetch product' });
    }
  }

  /** GET /api/products/slug/:slug */
  static async getBySlug(req, res) {
    try {
      const product = await ProductModel.getBySlug(req.params.slug);

      if (!product) {
        return res.status(404).json({ success: false, message: 'Product not found' });
      }

      res.json({ success: true, data: product });
    } catch (error) {
      console.error('getBySlug product error:', error.message);
      res.status(500).json({ success: false, message: 'Failed to fetch product' });
    }
  }
}

export default ProductController;
