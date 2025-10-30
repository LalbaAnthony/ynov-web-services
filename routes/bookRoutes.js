const bookController = require('../controllers/bookController');
const limiter = require('../middlewares/limiter');
const requireWriteAccess = require('../middlewares/requireWriteAccess');
const createRouter = require('../routeBuilder');

const { versionPrefix, router } = createRouter({
    version: 1,
    routes: [
        {
            method: 'get',
            url: '/',
            middlewares: [limiter(5000)],
            handler: bookController.getAllBooks,
        },
        {
            method: 'get',
            url: '/:id',
            middlewares: [limiter(5000)],
            handler: bookController.getBookById,
        },
        {
            method: 'post',
            url: '/',
            middlewares: [requireWriteAccess, limiter(10000)],
            handler: bookController.addBook,
        },
        {
            method: 'put',
            url: '/:id',
            middlewares: [limiter(5000)],
            handler: bookController.updateBook,
        },
        {
            method: 'delete',
            url: '/:id',
            middlewares: [requireWriteAccess, limiter(10000)],
            handler: bookController.deleteBook,
        },
    ],
});

module.exports = { prefix: versionPrefix + '/books', router };
