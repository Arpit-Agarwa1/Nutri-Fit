import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataDir = path.join(__dirname, '..', 'data');

/** Ensures data directory exists */
const ensureDataDir = () => {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
};

/**
 * Reads JSON data from a file in the data directory
 * @param {string} filename - Name of the JSON file
 * @returns {Array|Object} Parsed JSON data
 */
export const readData = (filename) => {
  ensureDataDir();
  const filePath = path.join(dataDir, filename);

  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify([], null, 2));
    return [];
  }

  const raw = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(raw || '[]');
};

/**
 * Writes data to a JSON file in the data directory
 * @param {string} filename - Name of the JSON file
 * @param {Array|Object} data - Data to persist
 */
export const writeData = (filename, data) => {
  ensureDataDir();
  const filePath = path.join(dataDir, filename);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};
