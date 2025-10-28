const express = require('express');
const app = express();

// Middleware pour lire le JSON
app.use(express.json());

// Import des routes
const booksRoutes = require('./routes/booksRoutes');
app.use('/api/books', booksRoutes);

module.exports = app;
