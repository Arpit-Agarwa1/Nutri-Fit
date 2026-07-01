import mongoose from 'mongoose';

/** Per-serving and per-100g nutrition values */
const nutritionValuesSchema = new mongoose.Schema(
  {
    calories: { type: Number },
    protein: { type: Number },
    carbohydrates: { type: Number },
    dietaryFiber: { type: Number },
    naturalSugar: { type: Number },
    addedSugar: { type: Number, default: null },
    totalFats: { type: Number },
    saturatedFat: { type: Number },
    transFat: { type: Number, default: 0 },
    cholesterol: { type: Number, default: 0 },
    sodium: { type: Number },
  },
  { _id: false }
);

const nutritionSchema = new mongoose.Schema(
  {
    servingSize: { type: String, default: '32g' },
    perServing: { type: nutritionValuesSchema, default: () => ({}) },
    per100g: { type: nutritionValuesSchema, default: () => ({}) },
  },
  { _id: false }
);

const productSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true, index: true },
    sku: { type: String, required: true, unique: true },
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, index: true },
    category: {
      type: String,
      enum: ['classic', 'flavored', 'fitness'],
      default: 'classic',
      index: true,
    },
    texture: {
      type: String,
      enum: ['Smooth', 'Crunchy', 'Crispy'],
      required: true,
      index: true,
    },
    flavor: { type: String, trim: true },
    shortDescription: { type: String, required: true },
    description: { type: String, required: true },
    tagline: { type: String },
    price: { type: Number, required: true, min: 0 },
    originalPrice: { type: Number, min: 0 },
    weight: { type: String, required: true },
    weightGrams: { type: Number, min: 0 },
    protein: { type: String },
    fiber: { type: String },
    nutrition: { type: nutritionSchema, default: () => ({}) },
    ingredients: [{ type: String }],
    allergens: [{ type: String }],
    features: [{ type: String }],
    tags: [{ type: String }],
    inStock: { type: Boolean, default: true },
    stockCount: { type: Number, default: 0, min: 0 },
    badge: { type: String },
    image: { type: String },
    isFeatured: { type: Boolean, default: false },
    sortOrder: { type: Number, default: 0 },
    rating: { type: Number, min: 0, max: 5, default: 0 },
    reviewCount: { type: Number, default: 0, min: 0 },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

productSchema.index({ isFeatured: 1, sortOrder: 1 });
productSchema.index({ tags: 1 });

/** Return API-friendly JSON without MongoDB _id */
productSchema.set('toJSON', {
  transform: (_doc, ret) => {
    delete ret._id;
    return ret;
  },
});

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

export default Product;
