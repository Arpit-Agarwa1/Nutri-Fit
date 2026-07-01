import { useState } from 'react';
import { contactService } from '../services/api';
import './ContactPage.css';

/** Contact page with form and info */
const ContactPage = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await contactService.submit(form);
      setSuccess(true);
      setForm({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-page">
      <div className="contact-header">
        <div className="container">
          <h1>Contact Us</h1>
          <p>We&apos;d love to hear from you</p>
        </div>
      </div>

      <div className="container contact-content">
        <div className="contact-info">
          <div className="info-card">
            <span className="info-icon">📧</span>
            <h3>Email</h3>
            <a href="mailto:bharatnutrifit@gmail.com">bharatnutrifit@gmail.com</a>
          </div>
          <div className="info-card">
            <span className="info-icon">📞</span>
            <h3>Phone</h3>
            <a href="tel:+919509201606">+91 95092 01606</a>
          </div>
          <div className="info-card">
            <span className="info-icon">📍</span>
            <h3>Location</h3>
            <p>Jaipur, Rajasthan, India</p>
          </div>
          <div className="info-card">
            <span className="info-icon">📱</span>
            <h3>Instagram</h3>
            <a href="https://instagram.com/nutri.fitbharat" target="_blank" rel="noopener noreferrer">
              @nutri.fitbharat
            </a>
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <h3>Send us a message</h3>

          {success && (
            <div className="form-success">
              Thank you! We will get back to you soon.
            </div>
          )}

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">Name *</label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={form.name}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={form.phone}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={form.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="subject">Subject</label>
            <input
              id="subject"
              name="subject"
              type="text"
              value={form.subject}
              onChange={handleChange}
              placeholder="General Inquiry"
            />
          </div>

          <div className="form-group">
            <label htmlFor="message">Message *</label>
            <textarea
              id="message"
              name="message"
              required
              rows="5"
              value={form.message}
              onChange={handleChange}
              placeholder="How can we help you?"
            />
          </div>

          {error && <p className="form-error">{error}</p>}

          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;
