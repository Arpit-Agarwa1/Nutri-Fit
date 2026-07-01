import Hero from '../components/sections/Hero';
import Marquee from '../components/Marquee';
import WhyChooseUs from '../components/sections/WhyChooseUs';
import FeaturedProducts from '../components/sections/FeaturedProducts';
import MissionVision from '../components/sections/MissionVision';
import HowToUse from '../components/sections/HowToUse';
import NutritionFacts from '../components/sections/NutritionFacts';
import FAQ from '../components/sections/FAQ';
import CTA from '../components/sections/CTA';
import AnimateOnScroll from '../components/AnimateOnScroll';
import { benefitsPage, productImageMap, texturesPage } from '../data/productImages';
import './HomePage.css';

/** Landing page with all sections from brochure */
const HomePage = () => {
  return (
    <div className="home-page">
      <Hero />
      <Marquee />

      <section className="problem-section">
        <div className="container problem-inner">
          <AnimateOnScroll animation="fade-left">
            <div className="problem-content">
              <h2>Still Eating Breakfast That Makes You Hungry Again in 2 Hours?</h2>
              <p>
                Switch to the peanut butter that&apos;s packed with protein, healthy fats,
                and long-lasting energy. Because your body deserves real nutrition—not
                empty calories.
              </p>
            </div>
          </AnimateOnScroll>
          <AnimateOnScroll animation="fade-right">
            <div className="problem-visual">
              <img
                src={texturesPage}
                alt="NutriFit Smooth and Crunchy Peanut Butter textures"
                className="textures-banner"
              />
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      <WhyChooseUs />
      <FeaturedProducts />
      <MissionVision />

      <section className="showcase-section">
        <div className="container showcase-grid">
          <AnimateOnScroll animation="fade-left">
            <div className="showcase-image-wrap">
              <img src={benefitsPage} alt="NutriFit Bharat Benefits" className="showcase-img" />
            </div>
          </AnimateOnScroll>
          <AnimateOnScroll animation="fade-right">
            <div className="showcase-content">
              <span className="showcase-label">Why NutriFit Bharat</span>
              <h2>Taste So Good. Nutrition, So Powerful.</h2>
              <p>
                100% premium roasted peanuts. High protein, rich in fiber, zero cholesterol.
                Every jar is crafted in India with care for your fitness goals.
              </p>
              <ul className="showcase-list">
                <li>26g Protein per 100g</li>
                <li>3x Smoother than other spreads</li>
                <li>Smooth, Crunchy & Crispy textures</li>
                <li>Dark Chocolate & Mango flavours</li>
              </ul>
              <div className="showcase-products">
                <img src={productImageMap['pb-dark-chocolate-crunchy']} alt="Dark Chocolate" />
                <img src={productImageMap['pb-mango-smooth']} alt="Mango" />
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      <HowToUse />
      <NutritionFacts />
      <FAQ />
      <Marquee />
      <CTA />
    </div>
  );
};

export default HomePage;
