import {
  filterProducts,
  getProductById,
  getProductBySlug,
  products,
} from '../../frontend/src/data/productStore.js';

export { filterProducts, getProductById, getProductBySlug, products };

/** Generate a simple unique ID for orders */
export const generateId = () =>
  `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

/** Set CORS headers for API responses */
export const setCorsHeaders = (res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
};

/** Handle OPTIONS preflight */
export const handleOptions = (req, res) => {
  setCorsHeaders(res);
  res.status(200).end();
};

/** Build order items and total from cart payload */
export const buildOrderItems = (items = []) => {
  let total = 0;
  const orderItems = [];

  for (const item of items) {
    const product = getProductById(item.productId);

    if (!product) {
      throw new Error(`Product not found: ${item.productId}`);
    }

    if (!product.inStock) {
      throw new Error(`${product.name} is out of stock`);
    }

    const quantity = item.quantity || 1;
    total += product.price * quantity;

    orderItems.push({
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity,
      subtotal: product.price * quantity,
    });
  }

  return { orderItems, total };
};
