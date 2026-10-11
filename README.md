# SoleCraft

SoleCraft is a sneaker customization and e-commerce project built for browsing, configuring, and ordering custom footwear. Users can choose a sneaker silhouette, change colors in real time, and review a product built to their specifications.

## Overview

This project combines a React frontend with an Express and MongoDB backend to provide a complete storefront experience with product browsing, authentication, cart functionality, and order management.

## Features

- 3D sneaker configurator with live visual updates
- Custom color and material selection
- User registration and login
- Protected routes for authenticated users
- Product catalog and product details
- Cart, checkout, and order history
- Responsive layout for desktop and mobile screens

## Tech Stack

Frontend:
- React
- Vite
- Tailwind CSS
- React Router
- Redux Toolkit
- React Three Fiber
- Three.js
- GSAP

Backend:
- Node.js
- Express
- MongoDB
- Mongoose
- JWT authentication

## Project Structure

```text
solecraft/
├── client/                 # Frontend application
│   ├── src/                # React source files
│   ├── public/             # Static assets
│   ├── .env.example        # Frontend environment example
│   └── package.json        # Frontend dependencies and scripts
├── server/                 # Backend API
│   ├── config/             # Database and app configuration
│   ├── controllers/        # Request handlers
│   ├── models/             # MongoDB models
│   ├── routes/             # API routes
│   ├── .env.example        # Backend environment example
│   └── package.json        # Backend dependencies and scripts
├── .gitignore
├── README.md
└── .github/                # GitHub automation and workflow files
```

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Sannny007/solecraft.git
cd solecraft
```

### 2. Set up the backend

```bash
cd server
npm install
cp .env.example .env
```

Create the backend environment file with your MongoDB connection and JWT secret. Example:

```env
PORT=5000
MONGO_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/solecraft
JWT_SECRET=replace_with_a_long_random_string
```

Start the server:

```bash
node server.js
```

### 3. Set up the frontend

```bash
cd ../client
npm install
cp .env.example .env
```

Example frontend environment:

```env
VITE_API_URL=http://localhost:5000/api
```

Start the frontend:

```bash
npm run dev
```

## Environment Notes

- The backend requires a MongoDB database connection.
- The frontend uses the backend API URL defined in `VITE_API_URL`.
- For production deployments, update environment variables to match your deployed server.

## Usage

Once both the backend and frontend are running, open the local frontend URL provided by Vite in the browser and use the app to browse products, customize sneakers, and complete an order.

## License

This project is available for educational and personal use. Check the repository for any additional project-specific licensing details.
