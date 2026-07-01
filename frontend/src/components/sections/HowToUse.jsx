import AnimateOnScroll from '../AnimateOnScroll';
import './HowToUse.css';

const uses = [
  { icon: '🍞', label: 'Breakfast Toast' },
  { icon: '🥤', label: 'Smoothies' },
  { icon: '💪', label: 'Protein Shake' },
  { icon: '🥣', label: 'Oats' },
  { icon: '🍎', label: 'Fruit Bowl' },
  { icon: '🍘', label: 'Rice Cakes' },
  { icon: '🫓', label: 'Paratha' },
  { icon: '🌯', label: 'Roti Roll' },
  { icon: '🥞', label: 'Pancakes' },
  { icon: '🥄', label: 'Direct from Spoon' },
];

const audiences = [
  'Fitness Lovers', 'Gym Members', 'Weight Loss Diets',
  'Weight Gain Diets', 'Kids', 'Office Professionals',
  'Busy Moms', 'Students', 'Athletes', 'Healthy Breakfast',
];

/** How to use and target audience section */
const HowToUse = () => {
  return (
    <section className="section how-section">
      <div className="container">
        <div className="how-grid">
          <div>
            <AnimateOnScroll animation="fade-left">
              <h2 className="section-title section-title-left">How To Use</h2>
              <p className="section-subtitle section-subtitle-left">
                Versatile enough for every meal and snack
              </p>
            </AnimateOnScroll>
            <div className="uses-grid">
              {uses.map((item, index) => (
                <AnimateOnScroll key={item.label} animation="fade-up" delay={index * 50}>
                  <div className="use-item">
                    <span>{item.icon}</span>
                    <p>{item.label}</p>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
          <div>
            <AnimateOnScroll animation="fade-right">
              <h2 className="section-title section-title-left">Perfect For</h2>
              <p className="section-subtitle section-subtitle-left">
                Whether your goal is weight loss, muscle gain, or clean eating
              </p>
            </AnimateOnScroll>
            <div className="audience-tags">
              {audiences.map((item, index) => (
                <AnimateOnScroll key={item} animation="scale" delay={index * 40}>
                  <span className="audience-tag">✔ {item}</span>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowToUse;
