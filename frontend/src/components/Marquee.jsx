import './Marquee.css';

const items = [
  'Real Peanuts. Real Protein. Real Results.',
  'Zero Cholesterol',
  '26g Protein',
  'Made in India 🇮🇳',
  'Premium Roasted Peanuts',
  'Fuel Better. Live Stronger.',
];

/** Scrolling brand marquee banner */
const Marquee = () => {
  const doubled = [...items, ...items];

  return (
    <div className="marquee-section">
      <div className="marquee-track">
        {doubled.map((text, i) => (
          <span key={i} className="marquee-item">
            {text}
            <span className="marquee-dot">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
