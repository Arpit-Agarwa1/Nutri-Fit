import '../config/env.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from '../config/mongodb.js';
import Product from '../schemas/Product.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const catalogPath = path.join(__dirname, '../../frontend/src/data/products.json');

/**
 * Seed products collection from frontend catalog JSON
 * Run: npm run seed
 */
const seedProducts = async () => {
  await connectDB();

  if (!fs.existsSync(catalogPath)) {
    console.error('Catalog not found:', catalogPath);
    process.exit(1);
  }

  const products = JSON.parse(fs.readFileSync(catalogPath, 'utf-8'));

  if (!products.length) {
    console.error('No products found in catalog');
    process.exit(1);
  }

  console.log('Seeding NutriFit product catalog...\n');

  for (const product of products) {
    await Product.findOneAndUpdate(
      { id: product.id },
      { $set: product },
      { upsert: true, returnDocument: 'after', runValidators: true }
    );
    console.log(`  ✓ ${product.name} (${product.sku})`);
  }

  const stale = await Product.deleteMany({
    id: { $nin: products.map((p) => p.id) },
  });

  if (stale.deletedCount > 0) {
    console.log(`\n  Removed ${stale.deletedCount} outdated product(s)`);
  }

  const count = await Product.countDocuments();
  console.log(`\nSeeded ${count} products into MongoDB`);
  process.exit(0);
};

seedProducts().catch((err) => {
  console.error('Seed failed:', err.message);
  process.exit(1);
});
