const express = require('express');

function createRouter({ version, routes }) {
    const router = express.Router();

    routes.forEach(({ method, url, middlewares = [], handler }) => {
        if (typeof router[method] !== 'function') {
            throw new Error(`Invalid HTTP method: ${method}`);
        }
        router[method](url, ...middlewares, handler);
    });

    // Prefix the version automatically (as /v1/books)
    const versionPrefix = version ? `/v${version}` : '';
    return { versionPrefix, router };
}

module.exports = createRouter;
