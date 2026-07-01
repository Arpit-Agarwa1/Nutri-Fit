import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { productService } from '../services/api';
import { useCart } from '../context/CartContext';
import './ProductPage.css';

/** Single product detail page */
const ProductPage = () => {
  const { slug } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await productService.getBySlug(slug);
        setProduct(res.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [slug]);

  if (loading) return <div className="spinner" />;

  if (error || !product) {
    return (
      <div className="container product-error">
        <h2>Product not found</h2>
        <Link to="/shop" className="btn btn-primary">Back to Shop</Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  return (
    <div className="product-page">
      <div className="container">
        <nav className="breadcrumb">
          <Link to="/">Home</Link> / <Link to="/shop">Shop</Link> / {product.name}
        </nav>

        <div className="product-detail">
          <div className="product-image-section">
            <div className="product-image-large">
              <span className="product-emoji-large">🥜</span>
              {product.badge && <span className="detail-badge">{product.badge}</span>}
            </div>
          </div>

          <div className="product-info-section">
            {product.flavor && <span className="product-flavor-tag">{product.flavor}</span>}
            <h1>{product.name}</h1>
            <p className="product-texture">{product.texture} Texture • {product.weight}</p>

            <div className="product-stats">
              <span>💪 {product.protein}</span>
              <span>🌾 {product.fiber}</span>
            </div>

            <div className="product-pricing">
              <span className="price-large">₹{product.price}</span>
              {product.originalPrice && (
                <span className="price-strike">₹{product.originalPrice}</span>
              )}
            </div>

            <p className="product-description">{product.description}</p>

            <ul className="product-features">
              {product.features.map((feature) => (
                <li key={feature}>✔ {feature}</li>
              ))}
            </ul>

            <div className="quantity-selector">
              <label>Quantity:</label>
              <div className="qty-controls">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>−</button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)}>+</button>
              </div>
            </div>

            <button
              className="btn btn-primary add-cart-btn"
              onClick={handleAddToCart}
              disabled={!product.inStock}
            >
              {product.inStock ? `Add to Cart — ₹${product.price * quantity}` : 'Out of Stock'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
