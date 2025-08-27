# 🏀 NBA/WNBA Stats Dashboard

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=flat&logo=node.js&logoColor=white)](https://nodejs.org/)

A comprehensive web application for tracking NBA and WNBA games, statistics, and player information in real-time. Built with modern web technologies for optimal performance and user experience.

## ✨ Features

- **Live Game Tracking**: Real-time scores and game updates
- **Comprehensive Stats**: Detailed team and player statistics
- **Game Schedules**: Complete season schedules and results
- **Play-by-Play**: Detailed game breakdowns
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Dark/Light Mode**: Built-in theme support
- **Advanced Search**: Find players, teams, and games quickly

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ (LTS recommended)
- npm 9+ or yarn
- Docker (optional, for containerized deployment)
- [SportRadar API](https://developer.sportradar.com/) key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/nba-wnba-stats.git
   cd nba-wnba-stats
   ```

2. **Install dependencies**
   ```bash
   # Install root dependencies
   npm install
   
   # Install frontend dependencies
   cd apps/frontend
   npm install
   
   # Install backend dependencies
   cd ../backend
   npm install
   ```

3. **Environment Setup**
   - Copy `.env.example` to `.env` in both frontend and backend directories
   - Add your SportRadar API key to the backend `.env` file

4. **Development**
   ```bash
   # Start both frontend and backend in development mode
   npm run dev
   ```
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3001

## 🏗️ Project Structure

```
nba-wnba-stats/
├── apps/
│   ├── backend/           # Backend API server (Node.js + Express)
│   │   ├── src/
│   │   │   ├── controllers/  # Request handlers
│   │   │   ├── middleware/   # Express middleware
│   │   │   ├── routes/       # API routes
│   │   │   ├── services/     # Business logic
│   │   │   └── utils/        # Helper functions
│   │   ├── .env             # Environment variables
│   │   └── package.json
│   │
│   └── frontend/          # Frontend React application (Vite + TypeScript)
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

## 🐳 Docker Deployment

```bash
# Build and start containers
docker-compose up --build

# In production mode
docker-compose -f docker-compose.prod.yml up --build
```

## 📚 API Documentation

The API documentation is available at `/api-docs` when running the backend in development mode.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [SportRadar](https://developer.sportradar.com/) for the sports data API
- [NBA](https://www.nba.com/) and [WNBA](https://www.wnba.com/) for the amazing basketball action
- All contributors who have helped improve this project

---

Made with ❤️ by [Your Name] | [![Twitter](https://img.shields.io/twitter/url?style=social&url=https%3A%2F%2Ftwitter.com%2Fyourhandle)](https://twitter.com/yourhandle)
