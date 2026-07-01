import AnimateOnScroll from '../AnimateOnScroll';
import './WhyChooseUs.css';

const benefits = [
  { icon: '💪', title: 'High Protein', desc: '26g protein per 100g for muscle recovery' },
  { icon: '❤️', title: 'Heart-Healthy Fats', desc: 'Rich in monounsaturated & polyunsaturated fats' },
  { icon: '🌾', title: 'Dietary Fiber', desc: '5g fiber per 100g keeps you full longer' },
  { icon: '✅', title: 'Zero Cholesterol', desc: 'Clean nutrition with no compromise' },
  { icon: '🥜', title: 'Premium Peanuts', desc: 'Carefully selected roasted peanuts' },
  { icon: '⚡', title: 'Energy Booster', desc: 'Long-lasting energy for your day' },
  { icon: '⚖️', title: 'Weight Management', desc: 'Helps manage hunger naturally' },
  { icon: '🛡️', title: 'Immune Support', desc: 'Vitamins & minerals for stronger immunity' },
];

/** Why Choose Us section */
const WhyChooseUs = () => {
  return (
    <section className="section why-section">
      <div className="container">
        <AnimateOnScroll animation="fade-up">
          <h2 className="section-title">Why Thousands Choose NutriFit Bharat</h2>
          <p className="section-subtitle">
            We don&apos;t make ordinary peanut butter. We craft premium nutrition
            that helps people eat healthier without compromising on taste.
          </p>
        </AnimateOnScroll>

        <div className="benefits-grid">
          {benefits.map((item, index) => (
            <AnimateOnScroll key={item.title} animation="fade-up" delay={index * 80}>
              <div className="benefit-card">
                <span className="benefit-icon">{item.icon}</span>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
