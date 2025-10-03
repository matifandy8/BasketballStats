# Basketball Stats API Backend

Backend service for the NBA/WNBA basketball statistics application. Provides game, player, team, and statistics data through a RESTful API.

## 🚀 Features

- 🏀 Real-time NBA/WNBA game data
- 📊 Detailed player and team statistics
- 🖼️ Image optimization
- ⚡ Caching and rate limiting
- 🔒 Input validation
- 📝 TypeScript documentation

## 📦 Project Structure

```
src/
├── controllers/       # API controllers
├── middlewares/      # Express middlewares
├── routes/          # Route definitions
├── services/        # Business logic
├── types/           # TypeScript types
└── utils/           # Utility functions and helpers
```

## 🛠️ Requirements

- Node.js 18+
- npm or yarn
- SportRadar API keys (for real-time data)

## 🔧 Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```
3. Set up environment variables (see `.env.example`)
4. Start the server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

{{ ... }}

## 🌐 Environment Variables

Create a `.env` file in the project root with the following variables:

```env
# Server Configuration
PORT=3001                              # Port number for the server to listen on
NODE_ENV=development                   # Application environment (development/production)

# SportRadar API Configuration
SR_ACCESS_LEVEL=trial                  # Access level for SportRadar API (trial/production)
SR_VERSION=v8                          # Version of the SportRadar API
SR_LOCALE=en                           # Locale for API responses (e.g., 'en', 'es')
SR_API_KEY=your_sportradar_api_key     # Your SportRadar API key (required)

# Redis Configuration (Optional - enables persistent caching)
REDIS_URL=redis://localhost:6379       # Redis connection URL

# External APIs
NEWS_API=your_news_api_key             # API key for news service
YOUTUBE_API_KEY=your_youtube_api_key   # API key for YouTube Data API

# Rate Limiting (Optional)
RATE_LIMIT_WINDOW_MS=900000            # Time window for rate limiting in milliseconds (15 minutes)
RATE_LIMIT_MAX_REQUESTS=100            # Maximum requests allowed per window

# Caching (Optional)
CACHE_TTL=3600                         # Default cache TTL in seconds (1 hour)
```

### Required Variables

- `SR_API_KEY`: Your SportRadar API key (get it from [SportRadar Developer Portal](https://developer.sportradar.com/))

### Optional Variables with Defaults

- `PORT=3001`
- `NODE_ENV=development`
- `SR_ACCESS_LEVEL=trial`
- `SR_VERSION=v8`
- `SR_LOCALE=en`
- `RATE_LIMIT_WINDOW_MS=900000` (15 minutes)
- `RATE_LIMIT_MAX_REQUESTS=100`
- `CACHE_TTL=3600` (1 hour)

### Redis Integration

To enable persistent caching and rate limiting, provide a `REDIS_URL`. If not provided, the application will use in-memory caching with limited functionality.

## 📚 API Documentation

API documentation is available at `/api-docs` when the server is running.

## 🧪 Testing

To run tests:

```bash
npm test
# or
yarn test
```

## 🚀 Deployment

The project is configured for deployment on Vercel or any Node.js compatible service.

## 🤝 Contributing

Contributions are welcome. Please read the contribution guidelines before submitting a pull request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
