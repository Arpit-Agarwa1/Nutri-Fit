import AnimateOnScroll from '../AnimateOnScroll';
import { nutritionImage } from '../../data/productImages';
import './NutritionFacts.css';

/** Nutrition facts table from brochure */
const NutritionFacts = () => {
  const rows = [
    { label: 'Calories (kcal)', serving: '192.96', per100: '603' },
    { label: 'Protein (g)', serving: '08', per100: '26' },
    { label: 'Carbohydrates (g)', serving: '10', per100: '30' },
    { label: 'Dietary Fiber (g)', serving: '03', per100: '05' },
    { label: 'Natural Sugar (g)', serving: '01', per100: '04' },
    { label: 'Added Sugar (g)', serving: '04', per100: '-' },
    { label: 'Total Fats (g)', serving: '03', per100: '08' },
    { label: 'Saturated Fat (g)', serving: '05', per100: '15' },
    { label: 'Trans Fat (g)', serving: '0', per100: '0' },
    { label: 'Cholesterol (mg)', serving: '0', per100: '0' },
    { label: 'Sodium (mg)', serving: '34', per100: '106' },
  ];

  return (
    <section className="section nutrition-section">
      <div className="container">
        <AnimateOnScroll animation="fade-up">
          <h2 className="section-title">Nutrition Facts</h2>
          <p className="section-subtitle">
            Serving Size: 32g per serving • 100% Premium Roasted Peanuts
          </p>
        </AnimateOnScroll>
        <AnimateOnScroll animation="scale" delay={150}>
          <div className="nutrition-layout">
            <img
              src={nutritionImage}
              alt="NutriFit Nutrition Label"
              className="nutrition-image"
            />
            <div className="nutrition-table-wrapper">
              <table className="nutrition-table">
                <thead>
                  <tr>
                    <th>Nutrient</th>
                    <th>Per Serving (32g)</th>
                    <th>Per 100g</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row) => (
                    <tr key={row.label}>
                      <td>{row.label}</td>
                      <td>{row.serving}</td>
                      <td>{row.per100}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
};

export default NutritionFacts;
