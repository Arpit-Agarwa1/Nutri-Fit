import {
  fetchProductBySlug,
  setCorsHeaders,
  handleOptions,
} from '../../lib/helpers.js';

/** GET /api/products/slug/:slug */
export default async function handler(req, res) {
  setCorsHeaders(res);

  if (req.method === 'OPTIONS') return handleOptions(req, res);

  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const { slug } = req.query;
    const product = await fetchProductBySlug(slug);

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    return res.status(200).json({ success: true, data: product });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to fetch product' });
  }
}
