import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { productService } from '../../services/api';
import ProductCard from '../ProductCard';
import AnimateOnScroll from '../AnimateOnScroll';
import './FeaturedProducts.css';

/** Featured products section on homepage */
const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await productService.getAll();
        setProducts(res.data.slice(0, 4));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section className="section featured-section">
      <div className="container">
        <AnimateOnScroll animation="fade-up">
          <h2 className="section-title">Choose Your Favourite</h2>
          <p className="section-subtitle">
            Available in Smooth, Crunchy & Crispy textures. Perfect for spreading,
            smoothies, and sandwiches.
          </p>
        </AnimateOnScroll>

        {loading && <div className="spinner" />}
        {error && <p className="error-msg">Failed to load products. Please try again.</p>}

        {!loading && !error && (
          <div className="products-grid">
            {products.map((product, index) => (
              <AnimateOnScroll key={product.id} animation="scale" delay={index * 100}>
                <ProductCard product={product} index={index} />
              </AnimateOnScroll>
            ))}
          </div>
        )}

        <AnimateOnScroll animation="fade-up" delay={200}>
          <div className="featured-cta">
            <Link to="/shop" className="btn btn-primary">View All Products</Link>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
};

export default FeaturedProducts;
