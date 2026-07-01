import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from '../config/mongodb.js';
import Product from '../schemas/Product.js';
import { readData } from '../config/database.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Seed products collection from products.json
 * Run: npm run seed
 */
const seedProducts = async () => {
  await connectDB();

  const products = readData('products.json');

  if (!products.length) {
    console.error('No products found in data/products.json');
    process.exit(1);
  }

  for (const product of products) {
    await Product.findOneAndUpdate(
      { id: product.id },
      { $set: product },
      { upsert: true, new: true }
    );
    console.log(`  ✓ ${product.name}`);
  }

  const count = await Product.countDocuments();
  console.log(`\nSeeded ${count} products into MongoDB`);
  process.exit(0);
};

seedProducts().catch((err) => {
  console.error('Seed failed:', err.message);
  process.exit(1);
});
