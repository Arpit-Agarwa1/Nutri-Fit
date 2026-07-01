# NutriFit Bharat — Full Stack E-commerce Website

Premium peanut butter brand website built with **React (JSX)** frontend and **Node.js Express MVC** backend.

**Tagline:** Your Fitness, Our Nutrition  
**Real Peanuts. Real Protein. Real Results.**

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, JSX, React Router, Vite |
| Backend | Node.js, Express.js |
| Architecture | MVC (Models, Views via API, Controllers) |
| Data Storage | JSON file-based persistence |

## Project Structure

```
NutriFIt Store/
├── backend/                 # Express MVC API
│   ├── config/              # Database config
│   ├── controllers/         # Request handlers
│   ├── models/              # Data models
│   ├── routes/              # API routes
│   ├── data/                # JSON data store
│   └── server.js            # Entry point
├── frontend/                # React SPA
│   ├── public/              # Static assets
│   └── src/
│       ├── components/      # Reusable UI components
│       ├── pages/           # Route pages
│       ├── context/         # Cart state management
│       └── services/        # API service layer
└── package.json             # Root scripts
```

## Features

- Landing page with all brochure content
- Product catalog with search & texture filters
- Product detail pages
- Shopping cart (localStorage persistence)
- Checkout with order placement
- Contact form
- About page with brand story
- FAQ accordion
- Nutrition facts table
- Responsive mobile design
- Brand colors: Orange (#FF8030), Green (#4CAF50), Blue (#2E3192)

## Getting Started

### Prerequisites
- Node.js 18+ installed

### Installation

```bash
# Install all dependencies
npm run install:all
```

### Development

Run backend and frontend in separate terminals:

```bash
# Terminal 1 — Backend API (port 5001)
npm run dev:backend

# Terminal 2 — Frontend (port 3000)
npm run dev:frontend
```

Open **http://localhost:3000** in your browser.

### API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| GET | `/api/products` | List all products |
| GET | `/api/products/:id` | Get product by ID |
| GET | `/api/products/slug/:slug` | Get product by slug |
| POST | `/api/orders` | Place an order |
| GET | `/api/orders/:id` | Get order details |
| POST | `/api/contact` | Submit contact form |

## Products

| Product | Texture | Price |
|---------|---------|-------|
| Smooth Peanut Butter | Smooth | ₹749 |
| Crunchy Peanut Butter | Crunchy | ₹749 |
| Crispy Peanut Butter | Crispy | ₹749 |
| Smooth Mango | Smooth | ₹799 |
| Crunchy Dark Chocolate | Crunchy | ₹849 |
| Pre-Workout Shake Mix | Smooth | ₹899 |

## Contact

- **Email:** nutrifitbharat@gmail.com
- **Phone:** +91 95092 01606
- **Instagram:** @nutri.fitbharat
- **Location:** Jaipur, Rajasthan, India

## License

© 2024 NutriFit Bharat. All rights reserved.
