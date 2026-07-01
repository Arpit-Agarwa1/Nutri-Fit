import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema(
  {
    productId: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    subtotal: { type: Number, required: true },
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    customer: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
    },
    items: [orderItemSchema],
    shippingAddress: { type: mongoose.Schema.Types.Mixed, default: {} },
    paymentMethod: { type: String, default: 'cod' },
    total: { type: Number, required: true },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'],
      default: 'pending',
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
    versionKey: false,
  }
);

orderSchema.set('toJSON', {
  transform: (_doc, ret) => {
    delete ret._id;
    if (ret.createdAt) {
      ret.createdAt = new Date(ret.createdAt).toISOString();
    }
    return ret;
  },
});

const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);

export default Order;
