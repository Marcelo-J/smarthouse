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
    'http://localhost:5173',
    'http://192.168.1.15:5173'  // ✅ Add your PC IP so your phone browser is allowed
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
const HOST = '0.0.0.0'; // ✅ Allows external devices on same network

app.listen(PORT, HOST, () => {
  console.log(`🚀 Server is running on http://192.168.222.89:${PORT}`);
});
