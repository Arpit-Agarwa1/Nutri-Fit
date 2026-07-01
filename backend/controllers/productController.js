import ProductModel from '../models/ProductModel.js';

/** Product controller - handles product HTTP requests */
class ProductController {
  /** GET /api/products */
  static getAll(req, res) {
    try {
      const { texture, flavor, search } = req.query;
      const products = ProductModel.getAll({ texture, flavor, search });
      res.json({ success: true, data: products, count: products.length });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Failed to fetch products' });
    }
  }

  /** GET /api/products/:id */
  static getById(req, res) {
    try {
      const product = ProductModel.getById(req.params.id);

      if (!product) {
        return res.status(404).json({ success: false, message: 'Product not found' });
      }

      res.json({ success: true, data: product });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Failed to fetch product' });
    }
  }

  /** GET /api/products/slug/:slug */
  static getBySlug(req, res) {
    try {
      const product = ProductModel.getBySlug(req.params.slug);

      if (!product) {
        return res.status(404).json({ success: false, message: 'Product not found' });
      }

      res.json({ success: true, data: product });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Failed to fetch product' });
    }
  }
}

export default ProductController;
