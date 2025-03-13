const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
require('dotenv').config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware Configuration
app.use(express.json());
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true
}));

app.use(session({
  secret: process.env.SESSION_SECRET || "supersecret",
  resave: false,
  saveUninitialized: true,
}));

// Route Imports
const booksRouter = require('./src/books/books.route');
const authorsRouter = require('./src/authors/authors.route');

// API Routes
app.use('/api/books', booksRouter);
app.use('/api/authors', authorsRouter);

// Database Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connection established');
  } catch (error) {
    console.error('MongoDB connection failed:', error);
    process.exit(1);
  }
};
connectDB();

// Root Route
app.get('/', (req, res) => {
  res.json({ message: 'Book Hub API is live!' });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
