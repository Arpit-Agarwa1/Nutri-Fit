import { setCorsHeaders, handleOptions } from '../lib/helpers.js';

/** GET /api/health */
export default function handler(req, res) {
  setCorsHeaders(res);

  if (req.method === 'OPTIONS') return handleOptions(req, res);

  return res.status(200).json({
    success: true,
    message: 'NutriFit Bharat API is running',
    timestamp: new Date().toISOString(),
  });
}
