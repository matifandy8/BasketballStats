# NBA/WNBA Stats Dashboard

A comprehensive web application for tracking NBA and WNBA games, statistics, and player information in real-time.

## 🚀 Features

- Game schedules and results
- Play-by-play game details
- Team and player statistics
- Responsive design for all devices
- Real-time updates
- Advanced search and filters

## Prerequisites

- Node.js 18+
- npm 9+ or yarn
- Docker (optional, for containerized deployment)
- SportRadar API key (for NBA/WNBA data)

## Project Structure

```
nba-stats/
├── apps/
│   ├── backend/           # Backend API server
│   │   ├── src/
│   │   │   ├── controllers/  # Request handlers
│   │   │   ├── middleware/   # Express middleware
│   │   │   ├── routes/       # API routes
│   │   │   ├── services/     # Business logic
│   │   │   └── utils/        # Helper functions
│   │   ├── .env             # Environment variables
│   │   └── package.json
│   │
│   └── frontend/          # Frontend React application
│       ├── public/        # Static files
│       └── src/
│           ├── components/  # Reusable UI components
│           ├── pages/       # Page components
│           ├── services/    # API services
│           └── styles/      # Global styles
│
├── docker-compose.yml     # Docker Compose configuration
└── package.json           # Root package.json (monorepo setup)
```

## Quick Start

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/nba-stats.git
cd nba-stats
```

### 2. Set up the backend
```bash
cd apps/backend
cp .env.example .env
# Edit .env with your SportRadar API key and other settings
npm install
```

### 3. Set up the frontend
```bash
cd ../frontend
npm install
```

### 4. Start the development environment
From the project root:
```bash
# Start both frontend and backend in development mode
npm run dev
```

Or start them separately:
```bash
# In one terminal (backend)
cd apps/backend
npm run dev

# In another terminal (frontend)
cd apps/frontend
npm start
```

### 5. Access the application
- Frontend: http://localhost:
- Backend API: http://localhost:3000/api

## Docker Setup

### Build and run with Docker Compose
```bash
docker-compose up --build
```

### Run tests
```bash
# Backend tests
cd apps/backend
npm test

# Frontend tests
cd ../frontend
npm test
```

## API Documentation

### Base URL
```
http://localhost:3000/api
```

### Authentication
No authentication is required for the public API endpoints.

### Rate Limiting
- 60 requests per minute per IP address
- Responses are cached for 5 minutes

### Endpoints

#### 1. Get Schedule by Season and Type
```
GET /api/sports/schedule/:year/:type
```

**Parameters**
| Type     | Name     | Required | Description                           |
|----------|----------|----------|---------------------------------------|
| Query    | league   | Yes      | 'nba' or 'wnba'                       |
| Path     | year     | Yes      | Season year (e.g., 2023)              |
| Path     | type     | Yes      | 'PRE', 'REG', or 'PST'                |

**Example**
```
GET /api/sports/schedule/2023/REG?league=nba
```

#### 2. Get Play-by-Play
```
GET /api/sports/game/:gameId/pbp
```

**Parameters**
| Type     | Name     | Required | Description         |
|----------|----------|----------|---------------------|
| Query    | league   | Yes      | 'nba' or 'wnba'     |
| Path     | gameId   | Yes      | Game ID             |

#### 3. Get Schedule by Date
```
GET /api/sports/schedule/:date
```

**Parameters**
| Type     | Name     | Required | Format              |
|----------|----------|----------|---------------------|
| Query    | league   | Yes      | 'nba' or 'wnba'     |
| Path     | date     | Yes      | YYYY-MM-DD          |

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [SportRadar](https://developer.sportradar.com/) for the NBA/WNBA data
- All contributors who have helped improve this project
