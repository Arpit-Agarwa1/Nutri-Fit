import { readData, writeData } from '../config/database.js';
import { v4 as uuidv4 } from 'uuid';

/** Order model - handles order persistence */
class OrderModel {
  /** Get all orders */
  static getAll() {
    return readData('orders.json');
  }

  /** Get order by ID */
  static getById(id) {
    const orders = readData('orders.json');
    return orders.find((o) => o.id === id) || null;
  }

  /**
   * Create a new order
   * @param {Object} orderData - Customer and cart details
   * @returns {Object} Created order
   */
  static create(orderData) {
    const orders = readData('orders.json');

    const order = {
      id: uuidv4(),
      ...orderData,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    orders.push(order);
    writeData('orders.json', orders);
    return order;
  }
}

export default OrderModel;
