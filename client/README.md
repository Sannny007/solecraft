# SoleCraft

A 3D sneaker customization app — pick a silhouette, recolor it live on an interactive 3D model, and check out a pair built to your own spec.

## Tech Stack

**Frontend:** React (Vite), Tailwind CSS v4, React Router, Redux Toolkit, React Three Fiber / Three.js, GSAP
**Backend:** Node.js, Express, MongoDB (Mongoose), JWT auth

## Features

- Live 3D sneaker configurator with real-time material recoloring
- User auth (register/login) with protected routes
- Cart, checkout, and order history
- Responsive, animated UI across all pages

## Running locally

\`\`\`bash
# Backend
cd server
npm install
npm run dev   # or: node server.js

# Frontend
cd client
npm install
npm run dev
\`\`\`

Set up `.env` files in both `client/` and `server/` — see `.env.example` in each folder for required variables.

Seed the database with sample products:
\`\`\`bash
node server/seed.js
\`\`\`