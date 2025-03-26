# Weather App

A modern weather application that provides current weather information and 5-day forecasts for cities in Lithuania and around this region.

## Live Demo

The application is currently running on AWS:

- Frontend: [http://weather-app-frontend-alb-1688729764.eu-north-1.elb.amazonaws.com//](http://weather-app-frontend-alb-1688729764.eu-north-1.elb.amazonaws.com//)
- Backend: [http://weather-app-backend-alb-1147937252.eu-north-1.elb.amazonaws.com/](http://weather-app-backend-alb-1147937252.eu-north-1.elb.amazonaws.com/)

## Project Structure

```
weather-app/
├── frontend/     # React + TypeScript frontend application
└── backend/      # NestJS backend application
```

## Features

- Current weather display with temperature, wind speed, humidity, cloud cover, and time
- 5-day weather forecast
- City search functionality with autocomplete
- Tracks and displays 3 most viewed cities using localStorage
- Responsive design for all devices
- Server-side logging of city selections

## Tech Stack

### Frontend

- React with TypeScript
- Vite as build tool
- Material-UI (MUI) for components
- SASS for custom styling
- Redux Toolkit for state management
- Axios for API requests

### Backend

- NestJS with TypeScript
- Meteo.lt API integration

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:

   ```bash
   # Backend
   cd backend
   npm install

   # Frontend
   cd frontend
   npm install
   ```

3. Set up environment variables:

   ```
   # Backend (.env)
   PORT=3000
   METEO_API_URL=https://api.meteo.lt/v1

   # Frontend (.env.development)
   VITE_API_URL=http://localhost:3000
   ```

4. Start the development servers:

   ```bash
   # Backend
   cd backend
   npm run start:dev

   # Frontend
   cd frontend
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:5173` to access the application.

## Testing

The project includes comprehensive test suites for both backend and frontend:

```bash
# Backend tests
cd backend
npm run test

# Frontend tests
cd frontend
npm run test
```
