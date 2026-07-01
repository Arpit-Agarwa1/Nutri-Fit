import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { productService } from '../services/api';
import ProductCard from '../components/ProductCard';
import './ShopPage.css';

/** Shop page with product listing and filters */
const ShopPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');

  const activeTexture = searchParams.get('texture') || '';

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const params = {};
        if (activeTexture) params.texture = activeTexture;
        if (search) params.search = search;

        const res = await productService.getAll(params);
        setProducts(res.data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const debounce = setTimeout(fetchProducts, search ? 300 : 0);
    return () => clearTimeout(debounce);
  }, [activeTexture, search]);

  const textures = ['All', 'Smooth', 'Crunchy', 'Crispy'];

  const handleTextureFilter = (texture) => {
    if (texture === 'All') {
      setSearchParams({});
    } else {
      setSearchParams({ texture });
    }
  };

  return (
    <div className="shop-page">
      <div className="shop-header">
        <div className="container">
          <h1>Shop NutriFit Bharat</h1>
          <p>Premium peanut butter in every texture you love</p>
        </div>
      </div>

      <div className="container shop-content">
        <div className="shop-filters">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
          <div className="filter-tabs">
            {textures.map((texture) => (
              <button
                key={texture}
                className={`filter-tab ${
                  (texture === 'All' && !activeTexture) ||
                  activeTexture === texture
                    ? 'active'
                    : ''
                }`}
                onClick={() => handleTextureFilter(texture)}
              >
                {texture}
              </button>
            ))}
          </div>
        </div>

        {loading && <div className="spinner" />}
        {error && <p className="error-msg">{error}</p>}

        {!loading && !error && products.length === 0 && (
          <p className="no-products">No products found. Try a different filter.</p>
        )}

        {!loading && !error && products.length > 0 && (
          <>
            <p className="product-count">{products.length} product(s) found</p>
            <div className="products-grid">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ShopPage;
