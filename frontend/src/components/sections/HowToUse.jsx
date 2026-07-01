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
            <h2 className="section-title" style={{ textAlign: 'left' }}>How To Use</h2>
            <p className="section-subtitle" style={{ textAlign: 'left', margin: '0 0 32px' }}>
              Versatile enough for every meal and snack
            </p>
            <div className="uses-grid">
              {uses.map((item) => (
                <div key={item.label} className="use-item">
                  <span>{item.icon}</span>
                  <p>{item.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="section-title" style={{ textAlign: 'left' }}>Perfect For</h2>
            <p className="section-subtitle" style={{ textAlign: 'left', margin: '0 0 32px' }}>
              Whether your goal is weight loss, muscle gain, or clean eating
            </p>
            <div className="audience-tags">
              {audiences.map((item) => (
                <span key={item} className="audience-tag">✔ {item}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowToUse;
