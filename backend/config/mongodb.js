import mongoose from 'mongoose';

/** Cached connection for serverless reuse (Vercel) and dev hot-reload */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

/**
 * Connect to MongoDB Atlas / local MongoDB
 * @returns {Promise<typeof mongoose>} Mongoose instance
 */
const connectDB = async () => {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error('MONGODB_URI is not defined in environment variables');
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(uri, {
      bufferCommands: false,
    });
  }

  cached.conn = await cached.promise;
  console.log('MongoDB connected successfully');
  return cached.conn;
};

/** Check if MongoDB is currently connected */
export const isConnected = () => mongoose.connection.readyState === 1;

export default connectDB;
