import { getProductById } from '../lib/helpers.js';
import { setCorsHeaders, handleOptions } from '../lib/helpers.js';

/** GET /api/products/:id */
export default function handler(req, res) {
  setCorsHeaders(res);

  if (req.method === 'OPTIONS') return handleOptions(req, res);

  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const { id } = req.query;
  const product = getProductById(id);

  if (!product) {
    return res.status(404).json({ success: false, message: 'Product not found' });
  }

  return res.status(200).json({ success: true, data: product });
}
