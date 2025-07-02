const express = require('express');
const connectDB = require('./db');
const authRoutes = require('./routes/authRoutes');
const cors = require('cors');

const app = express();

// Middleware
app.use(express.json());

// CORS Configuration
app.use(cors({
  origin: [
    'http://localhost:5173',                      // Local Vite dev server
    'https://smarthouse-coral.vercel.app',          // Main production frontend
    'https://smarthouse-git-master-marcelojs-projects.vercel.app', // Git branch preview
    'https://smarthouse-ginw0tfij-marcelojs-projects.vercel.app'  // Your Vercel frontend URL
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: [
    'Content-Type', 
    'Authorization', 
    'X-Requested-With',
    'Accept',
    'Origin'
  ]
}));

// Routes
app.use('/api/auth', authRoutes);

// Database connection
connectDB();

// Server port and host
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
