import ContactModel from '../models/ContactModel.js';

/** Contact controller - handles contact form submissions */
class ContactController {
  /** POST /api/contact */
  static create(req, res) {
    try {
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

      const contact = ContactModel.create({
        name,
        email,
        phone: phone || '',
        subject: subject || 'General Inquiry',
        message,
      });

      res.status(201).json({
        success: true,
        message: 'Thank you! We will get back to you soon.',
        data: { id: contact.id },
      });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Failed to submit contact form' });
    }
  }
}

export default ContactController;
