import { Link } from 'react-router-dom';
import AnimateOnScroll from '../components/AnimateOnScroll';
import { brandBanner } from '../data/productImages';
import './AboutPage.css';

/** About page with brand story from brochure */
const AboutPage = () => {
  const promises = [
    'Premium Ingredients',
    'Freshly Packed',
    'Authentic Taste',
    'Quality Checked',
    'Made With Care',
    '100% Satisfaction Commitment',
  ];

  const specialFeatures = [
    'Made from Premium Roasted Peanuts',
    'High Protein for Muscle Recovery',
    'Rich in Heart-Healthy Fats',
    'Good Source of Dietary Fiber',
    'Zero Cholesterol',
    'Rich, Creamy & Delicious Taste',
    'Long Lasting Energy',
    'Perfect Spreadability',
    'Vegetarian',
    'Gym Friendly',
    'Family Friendly',
  ];

  return (
    <div className="about-page">
      <div className="about-hero">
        <div className="container about-hero-inner">
          <AnimateOnScroll animation="fade-left">
            <div className="about-hero-text">
              <h1>About NutriFit Bharat</h1>
              <p className="about-tagline">Your Fitness, Our Nutrition</p>
              <p className="about-hero-desc">
                Premium peanut butter crafted in Jaipur with 100% roasted peanuts,
                high protein, and zero compromise on taste.
              </p>
            </div>
          </AnimateOnScroll>
          <AnimateOnScroll animation="fade-right" delay={150}>
            <div className="about-hero-visual">
              <img
                src={brandBanner}
                alt="NutriFit Bharat Brand"
                className="about-brand-banner"
              />
            </div>
          </AnimateOnScroll>
        </div>
      </div>

      <div className="container about-content">
        <section className="about-section">
          <h2>Born in Jaipur, Made for India</h2>
          <p>
            Born in Jaipur, Rajasthan, NutriFit Bharat believes that healthy food should
            never be boring. Our goal is simple — create premium-quality peanut butter
            that delivers exceptional taste, clean nutrition, and unmatched freshness.
          </p>
          <p>
            Whether you&apos;re a fitness enthusiast, a busy professional, a student, or a
            parent looking for healthier options, NutriFit Bharat fits perfectly into
            your lifestyle. Every jar is made with carefully selected roasted peanuts
            to ensure superior taste, high protein, and maximum nutrition.
          </p>
        </section>

        <section className="about-section">
          <h2>What Makes Our Peanut Butter Special?</h2>
          <div className="features-list">
            {specialFeatures.map((feature) => (
              <span key={feature} className="feature-tag">✔ {feature}</span>
            ))}
          </div>
        </section>

        <section className="about-section">
          <h2>Every Spoon Helps You</h2>
          <div className="helps-grid">
            {[
              'Stay Full Longer',
              'Support Lean Muscle Growth',
              'Increase Daily Protein Intake',
              'Manage Hunger Naturally',
              'Fuel Intense Workouts',
              'Support Weight Management',
              'Improve Energy Levels',
              'Healthy Snacking Anytime',
            ].map((item) => (
              <div key={item} className="help-item">✔ {item}</div>
            ))}
          </div>
        </section>

        <section className="about-section promise-section">
          <h2>Our Customer Promise</h2>
          <p>Every Jar Comes With:</p>
          <div className="promise-grid">
            {promises.map((item) => (
              <div key={item} className="promise-card">{item}</div>
            ))}
          </div>
        </section>

        <section className="about-section beliefs">
          <h2>We Believe</h2>
          <blockquote>
            Healthy food shouldn&apos;t taste boring. Protein shouldn&apos;t be expensive.
            Nutrition should fit every lifestyle. That&apos;s why every jar of NutriFit
            Bharat is made to deliver premium quality without compromise.
          </blockquote>
        </section>

        <div className="about-cta">
          <Link to="/shop" className="btn btn-primary">Shop Our Products</Link>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
