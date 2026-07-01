import OrderModel from '../models/OrderModel.js';
import ProductModel from '../models/ProductModel.js';

/** Normalize legacy and new shipping address shapes */
const normalizeShippingAddress = (address = {}) => ({
  addressLine1: address.addressLine1 || address.address || '',
  addressLine2: address.addressLine2 || '',
  city: address.city || '',
  state: address.state || '',
  pincode: address.pincode || '',
  landmark: address.landmark || '',
});

/** Order controller — handles order placement */
class OrderController {
  /** POST /api/orders */
  static async create(req, res) {
    try {
      const { customer, items, shippingAddress, paymentMethod } = req.body;

      if (!customer?.name || !customer?.email || !customer?.phone) {
        return res.status(400).json({
          success: false,
          message: 'Customer name, email, and phone are required',
        });
      }

      if (!items || items.length === 0) {
        return res.status(400).json({
          success: false,
          message: 'Order must contain at least one item',
        });
      }

      let total = 0;
      const orderItems = [];

      for (const item of items) {
        const product = await ProductModel.getById(item.productId);

        if (!product) {
          return res.status(400).json({
            success: false,
            message: `Product not found: ${item.productId}`,
          });
        }

        if (!product.inStock) {
          return res.status(400).json({
            success: false,
            message: `${product.name} is out of stock`,
          });
        }

        const quantity = item.quantity || 1;
        total += product.price * quantity;

        orderItems.push({
          productId: product.id,
          sku: product.sku,
          name: product.name,
          price: product.price,
          quantity,
          subtotal: product.price * quantity,
        });
      }

      const order = await OrderModel.create({
        customer,
        items: orderItems,
        shippingAddress: normalizeShippingAddress(shippingAddress),
        paymentMethod: paymentMethod || 'cod',
        notes: req.body.notes || '',
        total,
      });

      res.status(201).json({
        success: true,
        message: 'Order placed successfully',
        data: order,
      });
    } catch (error) {
      console.error('create order error:', error.message);
      res.status(500).json({ success: false, message: 'Failed to create order' });
    }
  }

  /** GET /api/orders/:id */
  static async getById(req, res) {
    try {
      const order = await OrderModel.getById(req.params.id);

      if (!order) {
        return res.status(404).json({ success: false, message: 'Order not found' });
      }

      res.json({ success: true, data: order });
    } catch (error) {
      console.error('getById order error:', error.message);
      res.status(500).json({ success: false, message: 'Failed to fetch order' });
    }
  }
}

export default OrderController;
