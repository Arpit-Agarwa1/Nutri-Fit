import { withDB, setCorsHeaders, handleOptions } from '../lib/helpers.js';
import { isConnected } from '../../backend/config/mongodb.js';

/** GET /api/health */
export default async function handler(req, res) {
  setCorsHeaders(res);

  if (req.method === 'OPTIONS') return handleOptions(req, res);

  let database = 'not configured';

  if (process.env.MONGODB_URI) {
    try {
      await withDB();
      database = isConnected() ? 'connected' : 'disconnected';
    } catch {
      database = 'error';
    }
  }

  return res.status(200).json({
    success: true,
    message: 'NutriFit Bharat API is running',
    database,
    timestamp: new Date().toISOString(),
  });
}
