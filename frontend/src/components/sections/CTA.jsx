import { Link } from 'react-router-dom';
import AnimateOnScroll from '../AnimateOnScroll';
import './CTA.css';

/** Call-to-action section at bottom of landing page */
const CTA = () => {
  return (
    <section className="cta-section">
      <div className="container cta-inner">
        <AnimateOnScroll animation="zoom">
          <h2>Ready To Upgrade Your Breakfast?</h2>
          <p>
            Don&apos;t settle for ordinary spreads. Choose the peanut butter that&apos;s
            delicious, protein-rich, and made to fuel your day.
          </p>
          <p className="cta-tagline">Taste Better. Eat Better. Live Better.</p>
          <Link to="/shop" className="btn btn-primary cta-btn">Order Today</Link>
          <div className="cta-badges">
            <span>✔ High Protein</span>
            <span>✔ Premium Roasted Peanuts</span>
            <span>✔ Zero Cholesterol</span>
            <span>✔ Made in India 🇮🇳</span>
            <span>✔ Quality Tested</span>
            <span>✔ Fast Shipping</span>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
};

export default CTA;
