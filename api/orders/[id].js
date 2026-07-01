import { setCorsHeaders, handleOptions } from '../lib/helpers.js';

/** GET /api/orders/:id */
export default function handler(req, res) {
  setCorsHeaders(res);

  if (req.method === 'OPTIONS') return handleOptions(req, res);

  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  // Orders are not persisted on serverless — client stores locally
  return res.status(404).json({ success: false, message: 'Order not found' });
}
