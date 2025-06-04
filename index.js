require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import CORS middleware
const portfolioRoutes = require('./routes/portfolioRoutes');

const app = express();

// Load environment variables
const PORT = process.env.PORT || 8080;
const MONGO_URI = process.env.MONGO_URI;
const FRONTEND_URL = process.env.FRONTEND_URL;

if (!MONGO_URI) {
  console.error('❌ MONGO_URI not found in environment variables');
  process.exit(1);
}

if (!FRONTEND_URL) {
  console.error('❌ FRONTEND_URL not found in environment variables');
  process.exit(1);
}

// Middleware
app.use(cors({ origin: FRONTEND_URL })); // ✅ Allow only the frontend URL
app.use(express.json());

// Routes
app.use(portfolioRoutes);

// Connect to MongoDB and export app for Vercel
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ Connected to MongoDB');
})
.catch((err) => {
  console.error('❌ MongoDB connection failed:', err.message);
  process.exit(1);
});

// Start the server only if not running in a serverless environment (like Vercel)
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
}

module.exports = app;
