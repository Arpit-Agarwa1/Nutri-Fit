import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    texture: { type: String, required: true },
    flavor: { type: String },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    originalPrice: { type: Number },
    weight: { type: String, required: true },
    protein: { type: String },
    fiber: { type: String },
    features: [{ type: String }],
    inStock: { type: Boolean, default: true },
    badge: { type: String },
    image: { type: String },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

/** Return API-friendly JSON without MongoDB _id */
productSchema.set('toJSON', {
  transform: (_doc, ret) => {
    delete ret._id;
    return ret;
  },
});

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

export default Product;
