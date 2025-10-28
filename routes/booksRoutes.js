const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const limiter = require('../middlewares/limiter');
const requireWriteAccess = require('../middlewares/requireWriteAccess');

router.get('/', limiter(5000), bookController.getAllBooks);
router.get('/:id', limiter(5000), bookController.getBookById);
router.post('/', requireWriteAccess, limiter(10000), bookController.addBook);
router.put('/:id', limiter(5000), bookController.updateBook);
router.delete('/:id', requireWriteAccess, limiter(10000), bookController.deleteBook);

module.exports = router;
