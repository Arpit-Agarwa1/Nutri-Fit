import { Link } from 'react-router-dom';
import './Hero.css';

/** Hero section - main landing banner */
const Hero = () => {
  return (
    <section className="hero">
      <div className="container hero-inner">
        <div className="hero-content">
          <span className="hero-badge">India&apos;s Premium Peanut Butter</span>
          <h1 className="hero-title">
            The Peanut Butter That{' '}
            <span className="text-orange">Powers</span>{' '}
            Every <span className="text-green">Goal</span>
          </h1>
          <p className="hero-subtitle">
            26g Protein • Premium Roasted Peanuts • Zero Cholesterol • No Compromise
          </p>
          <p className="hero-desc">
            Fuel your mornings, workouts, and healthy lifestyle with rich, creamy
            peanut butter made from carefully selected premium roasted peanuts.
          </p>
          <div className="hero-features">
            <span>✅ High Protein</span>
            <span>✅ Rich in Healthy Fats</span>
            <span>✅ Naturally Delicious</span>
            <span>✅ Perfect for Fitness</span>
          </div>
          <div className="hero-actions">
            <Link to="/shop" className="btn btn-primary">Shop Now</Link>
            <Link to="/about" className="btn btn-outline">Learn More</Link>
          </div>
          <div className="hero-rating">
            ⭐⭐⭐⭐⭐ Trusted by Thousands of Fitness Lovers
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-jar">
            <div className="jar-label">
              <span className="jar-brand">NUTRIFIT</span>
              <span className="jar-sub">BHARAT</span>
            </div>
            <div className="jar-stats">
              <div className="stat">
                <strong>26g</strong>
                <span>Protein</span>
              </div>
              <div className="stat">
                <strong>0</strong>
                <span>Cholesterol</span>
              </div>
              <div className="stat">
                <strong>9g</strong>
                <span>Fiber</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
