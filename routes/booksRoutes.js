const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const limiter = require('../middlewares/limiter');

router.get('/', limiter(5000), bookController.getAllBooks);
router.get('/:id', limiter(5000), bookController.getBookById);
router.post('/', limiter(5000), bookController.addBook);
router.put('/:id', limiter(5000), bookController.updateBook);
router.delete('/:id', limiter(5000), bookController.deleteBook);

module.exports = router;
