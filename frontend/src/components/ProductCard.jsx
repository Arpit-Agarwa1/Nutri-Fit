import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './ProductCard.css';

/**
 * Reusable product card component
 * @param {Object} product - Product data from API
 * @param {number} index - Stagger animation index
 */
const ProductCard = ({ product, index = 0 }) => {
  const { addToCart } = useCart();

  const textureColors = {
    Smooth: 'badge-green',
    Crunchy: 'badge-orange',
    Crispy: 'badge-orange',
  };

  return (
    <div className="product-card" style={{ animationDelay: `${index * 0.1}s` }}>
      <Link to={`/product/${product.slug}`} className="product-card-image">
        <img
          src={product.image}
          alt={product.name}
          className="product-img"
          loading="lazy"
        />
        <span className={`badge ${textureColors[product.texture] || 'badge-green'}`}>
          {product.texture}
        </span>
        {product.badge && (
          <span className="product-card-badge">{product.badge}</span>
        )}
      </Link>

      <div className="product-card-body">
        {product.flavor && (
          <span className="product-flavor">{product.flavor}</span>
        )}
        <Link to={`/product/${product.slug}`}>
          <h3 className="product-card-title">{product.name}</h3>
        </Link>
        <p className="product-card-meta">
          {product.protein} • {product.weight}
        </p>
        <div className="product-card-price">
          <span className="price-current">₹{product.price}</span>
          {product.originalPrice && (
            <span className="price-original">₹{product.originalPrice}</span>
          )}
        </div>
        <button
          className="btn btn-primary product-card-btn"
          onClick={() => addToCart(product)}
          disabled={!product.inStock}
        >
          {product.inStock ? 'Add to Cart' : 'Out of Stock'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
