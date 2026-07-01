import { Link } from 'react-router-dom';
import './Footer.css';

/** Site footer with links and contact info */
const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <img src="/logo.png" alt="NutriFit Bharat" className="footer-logo" />
            <p className="footer-tagline">Your Fitness, Our Nutrition</p>
            <p className="footer-desc">
              Real Peanuts. Real Protein. Real Results.
              Premium peanut butter made in Jaipur, Rajasthan.
            </p>
            <div className="footer-social">
              <a href="https://instagram.com/nutri.fitbharat" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                Instagram
              </a>
            </div>
          </div>

          <div className="footer-links">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/shop">Shop All</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/shop?texture=Smooth">Smooth</Link></li>
              <li><Link to="/shop?texture=Crunchy">Crunchy</Link></li>
            </ul>
          </div>

          <div className="footer-links">
            <h4>Benefits</h4>
            <ul>
              <li>26g Protein per 100g</li>
              <li>Zero Cholesterol</li>
              <li>High Dietary Fiber</li>
              <li>Premium Roasted Peanuts</li>
              <li>Made in India 🇮🇳</li>
            </ul>
          </div>

          <div className="footer-contact">
            <h4>Contact Us</h4>
            <p>
              <a href="mailto:nutrifitbharat@gmail.com">nutrifitbharat@gmail.com</a>
            </p>
            <p>
              <a href="tel:+919509201606">+91 95092 01606</a>
            </p>
            <p>Jaipur, Rajasthan, India</p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} NutriFit Bharat. All rights reserved.</p>
          <p>Quality Tested • Fast Shipping • Secure Checkout • Easy Returns</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
