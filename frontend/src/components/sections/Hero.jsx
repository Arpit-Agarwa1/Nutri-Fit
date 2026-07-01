import { Link } from 'react-router-dom';
import './Hero.css';

/** Hero section - main landing banner */
const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-bg-shapes">
        <span className="shape shape-1" />
        <span className="shape shape-2" />
        <span className="shape shape-3" />
      </div>

      <div className="container hero-inner">
        <div className="hero-content">
          <span className="hero-badge animate-fade-in-down">India&apos;s Premium Peanut Butter</span>
          <h1 className="hero-title animate-fade-in-down" style={{ animationDelay: '0.1s' }}>
            The Peanut Butter That{' '}
            <span className="text-orange">Powers</span>{' '}
            Every <span className="text-green">Goal</span>
          </h1>
          <p className="hero-subtitle animate-fade-in-down" style={{ animationDelay: '0.2s' }}>
            26g Protein • Premium Roasted Peanuts • Zero Cholesterol • No Compromise
          </p>
          <p className="hero-desc animate-fade-in-down" style={{ animationDelay: '0.3s' }}>
            Fuel your mornings, workouts, and healthy lifestyle with rich, creamy
            peanut butter made from carefully selected premium roasted peanuts.
          </p>
          <div className="hero-features animate-fade-in-down" style={{ animationDelay: '0.4s' }}>
            <span>✅ High Protein</span>
            <span>✅ Rich in Healthy Fats</span>
            <span>✅ Naturally Delicious</span>
            <span>✅ Perfect for Fitness</span>
          </div>
          <div className="hero-actions animate-fade-in-down" style={{ animationDelay: '0.5s' }}>
            <Link to="/shop" className="btn btn-primary">Shop Now</Link>
            <Link to="/about" className="btn btn-outline">Learn More</Link>
          </div>
          <div className="hero-rating animate-fade-in-down" style={{ animationDelay: '0.6s' }}>
            ⭐⭐⭐⭐⭐ Trusted by Thousands of Fitness Lovers
          </div>
        </div>

        <div className="hero-visual animate-bounce-in">
          <div className="hero-image-wrap animate-float-slow animate-pulse-glow">
            <img
              src="/images/product-main.jpg"
              alt="NutriFit Bharat Premium Peanut Butter"
              className="hero-product-img"
            />
          </div>
          <div className="hero-stats-float">
            <div className="stat-chip">
              <strong>26g</strong>
              <span>Protein</span>
            </div>
            <div className="stat-chip">
              <strong>0</strong>
              <span>Cholesterol</span>
            </div>
            <div className="stat-chip">
              <strong>9g</strong>
              <span>Fiber</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
