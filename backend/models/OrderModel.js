import { v4 as uuidv4 } from 'uuid';
import Order from '../schemas/Order.js';

/** Order model — MongoDB persistence */
class OrderModel {
  /** Get all orders */
  static async getAll() {
    const orders = await Order.find().sort({ createdAt: -1 }).lean();
    return orders.map(({ _id, ...rest }) => ({
      ...rest,
      createdAt: rest.createdAt ? new Date(rest.createdAt).toISOString() : undefined,
    }));
  }

  /** Get order by ID */
  static async getById(id) {
    const order = await Order.findOne({ id }).lean();
    if (!order) return null;
    const { _id, ...rest } = order;
    return {
      ...rest,
      createdAt: rest.createdAt ? new Date(rest.createdAt).toISOString() : undefined,
    };
  }

  /**
   * Create a new order
   * @param {Object} orderData - Customer and cart details
   * @returns {Promise<Object>} Created order
   */
  static async create(orderData) {
    const order = await Order.create({
      id: uuidv4(),
      ...orderData,
      status: 'pending',
    });

    return order.toJSON();
  }
}

export default OrderModel;
