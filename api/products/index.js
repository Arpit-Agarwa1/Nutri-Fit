import {
  getProducts,
  setCorsHeaders,
  handleOptions,
} from '../lib/helpers.js';

/** GET /api/products */
export default async function handler(req, res) {
  setCorsHeaders(res);

  if (req.method === 'OPTIONS') return handleOptions(req, res);

  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const { texture, flavor, search } = req.query;
    const data = await getProducts({ texture, flavor, search });
    return res.status(200).json({ success: true, data, count: data.length });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to fetch products' });
  }
}
