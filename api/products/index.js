import { filterProducts } from '../../lib/helpers.js';
import { setCorsHeaders, handleOptions } from '../../lib/helpers.js';

/** GET /api/products */
export default function handler(req, res) {
  setCorsHeaders(res);

  if (req.method === 'OPTIONS') return handleOptions(req, res);

  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const { texture, flavor, search } = req.query;
  const data = filterProducts({ texture, flavor, search });

  return res.status(200).json({ success: true, data, count: data.length });
}
