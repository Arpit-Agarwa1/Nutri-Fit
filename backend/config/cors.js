/**
 * Allowed origins for cross-origin requests (Vercel frontend → Render API)
 */
const LOCAL_ORIGINS = [
  'http://localhost:3000',
  'http://localhost:4173',
];

/** Check if request origin is allowed */
export const isAllowedOrigin = (origin) => {
  if (!origin) return true;

  const allowed = [
    ...LOCAL_ORIGINS,
    process.env.FRONTEND_URL,
  ].filter(Boolean);

  if (allowed.includes(origin)) return true;

  // Vercel production and preview deployments (e.g. nutri-fit-theta.vercel.app)
  if (/^https:\/\/[\w.-]+\.vercel\.app$/.test(origin)) return true;

  return false;
};

/** Express CORS options */
export const corsOptions = {
  origin: (origin, callback) => {
    if (isAllowedOrigin(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`CORS blocked: ${origin}`));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};
