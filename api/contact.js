import { setCorsHeaders, handleOptions } from '../lib/helpers.js';

/** POST /api/contact — submit contact form */
export default function handler(req, res) {
  setCorsHeaders(res);

  if (req.method === 'OPTIONS') return handleOptions(req, res);

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const { name, email, phone, message, subject } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      message: 'Name, email, and message are required',
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      message: 'Please provide a valid email address',
    });
  }

  return res.status(201).json({
    success: true,
    message: 'Thank you! We will get back to you soon.',
    data: {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    },
  });
}
