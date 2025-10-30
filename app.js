const express = require('express');
const app = express();

// Middleware pour lire le JSON
app.use(express.json());

// Import des routes
const bookRoutes = require('./routes/bookRoutes');
app.use(`/api${bookRoutes.prefix}`, bookRoutes.router); // as http://localhost:3000/api/v1/books

// Handle unhandled routes
app.use((req, res, next) => {
    res.status(404).json({ message: 'Route not found' });
})

module.exports = app;
