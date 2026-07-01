import {
  buildOrderItems,
  generateId,
  saveOrder,
  setCorsHeaders,
  handleOptions,
} from '../lib/helpers.js';

/** POST /api/orders — create order */
export default async function handler(req, res) {
  setCorsHeaders(res);

  if (req.method === 'OPTIONS') return handleOptions(req, res);

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

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

    const { orderItems, total } = await buildOrderItems(items);

    const orderPayload = {
      customer,
      items: orderItems,
      shippingAddress: shippingAddress || {},
      paymentMethod: paymentMethod || 'cod',
      total,
    };

    const saved = await saveOrder(orderPayload);

    const order = saved || {
      id: generateId(),
      ...orderPayload,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    return res.status(201).json({
      success: true,
      message: 'Order placed successfully',
      data: order,
    });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
}
