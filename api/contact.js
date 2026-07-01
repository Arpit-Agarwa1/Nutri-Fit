import {
  saveContact,
  generateId,
  setCorsHeaders,
  handleOptions,
} from '../lib/helpers.js';

/** POST /api/contact — submit contact form */
export default async function handler(req, res) {
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

  try {
    const saved = await saveContact({
      name,
      email,
      phone: phone || '',
      subject: subject || 'General Inquiry',
      message,
    });

    return res.status(201).json({
      success: true,
      message: 'Thank you! We will get back to you soon.',
      data: { id: saved?.id || generateId() },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to submit contact form' });
  }
}
