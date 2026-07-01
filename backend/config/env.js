import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** Load backend/.env — override injected shell env so local file wins */
dotenv.config({
  path: path.join(__dirname, '..', '.env'),
  override: true,
});
