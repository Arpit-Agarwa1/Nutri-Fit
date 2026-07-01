import { useState } from 'react';
import './FAQ.css';

const faqs = [
  {
    q: 'Is it suitable for weight loss?',
    a: 'Yes. When consumed in the right portion, peanut butter can help keep you fuller for longer because it contains protein and healthy fats.',
  },
  {
    q: 'Can kids eat it?',
    a: 'Absolutely. It is a delicious source of protein and energy for growing children (unless they have a peanut allergy).',
  },
  {
    q: 'Is it good for gym-goers?',
    a: 'Yes. It is an excellent pre-workout or post-workout food to help meet your daily protein and calorie needs.',
  },
  {
    q: 'How should I store it?',
    a: 'Store in a cool, dry place. Stir before use if natural oil separation occurs.',
  },
  {
    q: 'What makes NutriFit different from other brands?',
    a: 'Our peanut butter is 3x smoother, made from 100% premium roasted peanuts, with 26g protein per 100g and zero cholesterol. No artificial additives.',
  },
  {
    q: 'Is it vegetarian?',
    a: 'Yes, all NutriFit Bharat products are 100% vegetarian and made with natural ingredients.',
  },
];

/** FAQ accordion section */
const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="section faq-section">
      <div className="container">
        <h2 className="section-title">Frequently Asked Questions</h2>
        <p className="section-subtitle">
          Got questions? We&apos;ve got answers.
        </p>
        <div className="faq-list">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`faq-item ${openIndex === index ? 'open' : ''}`}
            >
              <button
                className="faq-question"
                onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
              >
                {faq.q}
                <span className="faq-icon">{openIndex === index ? '−' : '+'}</span>
              </button>
              {openIndex === index && (
                <div className="faq-answer">
                  <p>{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
