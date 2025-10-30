const express = require('express');
const swaggerUi = require('swagger-ui-express');
const bookRoutes = require('./routes/bookRoutes');

const app = express();

// Middleware pour lire le JSON
app.use(express.json());

// Build des routes
app.use(bookRoutes.prefix, bookRoutes.router); // as http://localhost:3000/api/v1/books

// Construire le spec OpenAPI global en agrégeant les specs partielles
function mergeSwaggers(modules) {
    const merged = {
        openapi: '3.0.1',
        info: { title: 'Mon API', version: '1.0.0' },
        servers: [{ url: 'http://localhost:3000' }],
        paths: {},
        components: { schemas: {} }
    };

    modules.forEach((m) => {
        const s = m.swagger || {};
        // merge paths
        Object.entries(s.paths || {}).forEach(([p, obj]) => {
            // si path existe déjà, merge les méthodes
            merged.paths[p] = merged.paths[p] || {};
            Object.entries(obj).forEach(([method, op]) => {
                merged.paths[p][method] = op;
            });
        });
        // merge components.schemas
        if (s.components?.schemas) {
            merged.components.schemas = Object.assign({}, merged.components.schemas, s.components.schemas);
        }
    });

    return merged;
}

const apiSpec = mergeSwaggers([bookRoutes /* , other route modules here */]);

// Mount swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(apiSpec));

// Handle unhandled routes
app.use((req, res, next) => {
    res.status(404).json({ message: 'Route not found' });
})

module.exports = app;
