/** Vite-bundled image URLs from NutriFit Bharat brochure PDF */
import heroMain from '../assets/images/hero-main.jpg';
import heroProduct from '../assets/images/hero-product.jpg';
import benefitsPage from '../assets/images/benefits-page.jpg';
import brandBanner from '../assets/images/brand-banner.jpg';
import texturesPage from '../assets/images/textures-page.jpg';
import nutritionImage from '../assets/images/product-nutrition.jpg';
import productSmooth from '../assets/images/product-smooth.jpg';
import productCrunchy from '../assets/images/product-crunchy.jpg';
import productCrispy from '../assets/images/product-crispy.jpg';
import productMango from '../assets/images/product-mango.jpg';
import productChocolate from '../assets/images/product-chocolate.jpg';
import productPreworkout from '../assets/images/product-preworkout.jpg';

export {
  heroMain,
  heroProduct,
  benefitsPage,
  brandBanner,
  texturesPage,
  nutritionImage,
};

/** Map product IDs to brochure image assets */
export const productImageMap = {
  'pb-smooth-1kg': productSmooth,
  'pb-crunchy-1kg': productCrunchy,
  'pb-crispy-1kg': productCrispy,
  'pb-mango-smooth': productMango,
  'pb-dark-chocolate-crunchy': productChocolate,
  'pb-preworkout': productPreworkout,
};

/**
 * Attach bundled image URLs to product list
 * @param {Array} items - Product array
 * @returns {Array} Products with resolved image URLs
 */
export const withProductImages = (items) =>
  items.map((product) => ({
    ...product,
    image: productImageMap[product.id] || product.image,
  }));

/** Get bundled image for a single product */
export const getProductImage = (productId) => productImageMap[productId] || '';
