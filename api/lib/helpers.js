import { randomUUID } from 'crypto';
import connectDB from '../../backend/config/mongodb.js';
import {
  filterProducts,
  getProductById,
  getProductBySlug,
} from '../../frontend/src/data/productStore.js';
import Product from '../../backend/schemas/Product.js';
import Order from '../../backend/schemas/Order.js';
import Contact from '../../backend/schemas/Contact.js';

export { filterProducts, getProductById, getProductBySlug };

/** Generate a unique ID */
export const generateId = () => randomUUID();

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

/** Connect to MongoDB if MONGODB_URI is set */
export const withDB = async () => {
  if (!process.env.MONGODB_URI) return false;
  await connectDB();
  return true;
};

/** Get products from MongoDB or static fallback */
export const getProducts = async (filters = {}) => {
  const hasDb = await withDB();

  if (hasDb) {
    const query = {};
    if (filters.texture) query.texture = new RegExp(`^${filters.texture}$`, 'i');
    if (filters.flavor) query.flavor = new RegExp(`^${filters.flavor}$`, 'i');

    let products = await Product.find(query).lean();

    if (filters.search) {
      const term = filters.search.toLowerCase();
      products = products.filter(
        (p) =>
          p.name.toLowerCase().includes(term) ||
          p.shortDescription?.toLowerCase().includes(term) ||
          p.description.toLowerCase().includes(term) ||
          p.texture.toLowerCase().includes(term) ||
          p.flavor?.toLowerCase().includes(term) ||
          p.tags?.some((tag) => tag.toLowerCase().includes(term))
      );
    }

    return products.map(({ _id, ...rest }) => rest);
  }

  return filterProducts(filters);
};

/** Get product by ID from MongoDB or static fallback */
export const fetchProductById = async (id) => {
  const hasDb = await withDB();
  if (hasDb) {
    const product = await Product.findOne({ id }).lean();
    if (product) {
      const { _id, ...rest } = product;
      return rest;
    }
    return null;
  }
  return getProductById(id);
};

/** Get product by slug from MongoDB or static fallback */
export const fetchProductBySlug = async (slug) => {
  const hasDb = await withDB();
  if (hasDb) {
    const product = await Product.findOne({ slug }).lean();
    if (product) {
      const { _id, ...rest } = product;
      return rest;
    }
    return null;
  }
  return getProductBySlug(slug);
};

/** Build order items and total from cart payload */
export const buildOrderItems = async (items = []) => {
  let total = 0;
  const orderItems = [];

  for (const item of items) {
    const product = await fetchProductById(item.productId);

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

/** Save order to MongoDB */
export const saveOrder = async (orderData) => {
  const hasDb = await withDB();
  if (!hasDb) return null;

  const order = await Order.create({
    id: randomUUID(),
    ...orderData,
    status: 'pending',
  });

  return order.toJSON();
};

/** Save contact to MongoDB */
export const saveContact = async (contactData) => {
  const hasDb = await withDB();
  if (!hasDb) return null;

  const contact = await Contact.create({
    id: randomUUID(),
    ...contactData,
  });

  return contact.toJSON();
};

/** Get order by ID from MongoDB */
export const fetchOrderById = async (id) => {
  const hasDb = await withDB();
  if (!hasDb) return null;

  const order = await Order.findOne({ id }).lean();
  if (!order) return null;

  const { _id, ...rest } = order;
  return {
    ...rest,
    createdAt: rest.createdAt ? new Date(rest.createdAt).toISOString() : undefined,
  };
};
