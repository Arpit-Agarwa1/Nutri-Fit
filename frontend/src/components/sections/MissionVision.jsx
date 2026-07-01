import './MissionVision.css';

/** Mission and Vision section */
const MissionVision = () => {
  return (
    <section className="section mission-section">
      <div className="container">
        <div className="mission-grid">
          <div className="mission-card">
            <span className="mission-label">Our Mission</span>
            <h3>Making Healthy Eating Simple</h3>
            <p>
              To make healthy eating simple, affordable, and delicious for every
              Indian household by creating premium-quality nutrition products made
              with honesty, purity, and care.
            </p>
          </div>
          <div className="mission-card vision">
            <span className="mission-label">Our Vision</span>
            <h3>India&apos;s Most Trusted Nutrition Brand</h3>
            <p>
              To become India&apos;s most trusted nutrition brand that inspires
              millions to live stronger, healthier, and happier lives through
              better food choices.
            </p>
          </div>
        </div>
        <div className="tagline-block">
          <p className="tagline-main">Real Peanuts. Real Protein. Real Results.</p>
          <p className="tagline-alt">Fuel Better. Live Stronger.</p>
        </div>
      </div>
    </section>
  );
};

export default MissionVision;
