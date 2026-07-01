import Hero from '../components/sections/Hero';
import WhyChooseUs from '../components/sections/WhyChooseUs';
import FeaturedProducts from '../components/sections/FeaturedProducts';
import MissionVision from '../components/sections/MissionVision';
import HowToUse from '../components/sections/HowToUse';
import NutritionFacts from '../components/sections/NutritionFacts';
import FAQ from '../components/sections/FAQ';
import CTA from '../components/sections/CTA';
import './HomePage.css';

/** Landing page with all sections from brochure */
const HomePage = () => {
  return (
    <div className="home-page">
      <Hero />

      <section className="problem-section">
        <div className="container">
          <h2>Still Eating Breakfast That Makes You Hungry Again in 2 Hours?</h2>
          <p>
            Switch to the peanut butter that&apos;s packed with protein, healthy fats,
            and long-lasting energy. Because your body deserves real nutrition—not
            empty calories.
          </p>
        </div>
      </section>

      <WhyChooseUs />
      <FeaturedProducts />
      <MissionVision />
      <HowToUse />
      <NutritionFacts />
      <FAQ />
      <CTA />
    </div>
  );
};

export default HomePage;
