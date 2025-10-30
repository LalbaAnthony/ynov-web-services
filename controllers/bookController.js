const { attachLinks } = require('../hateoasHelper');
const BookProxy = require('../proxies/bookProxy');

function getAllBooks(req, res) {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const params = { page, limit };

    const books = BookProxy.getAll(params);
    const enricheds = attachLinks('books', books, req.baseUrl, 1);
    
    res.json(enricheds);
}

function getBookById(req, res) {
    const id = parseInt(req.params.id);
    const book = BookProxy.getById(id);

    if (!book) {
        return res.status(404).json({ message: "Livre non trouvé" });
    }

    const enriched = attachLinks('books', book, req.baseUrl, 1);

    res.json(enriched);
}

function addBook(req, res) {
    const { title, author } = req.body;

    if (!title || !author) {
        return res.status(400).json({ message: "Titre et auteur sont requis." });
    }

    const newBook = BookProxy.add(title, author);
    
    const enriched = attachLinks('books', newBook, req.baseUrl, 1);

    res.status(201).json(enriched);
}

function updateBook(req, res) {
    const id = parseInt(req.params.id);
    const { title, author } = req.body;

    if (!title || !author) {
        return res.status(400).json({ message: "Titre et auteur sont requis." });
    }

    const updated = BookProxy.update(id, title, author);

    if (!updated) {
        return res.status(404).json({ message: "Livre non trouvé" });
    }

    const enriched = attachLinks('books', updated, req.baseUrl, 1);

    res.json(enriched);
}

function deleteBook(req, res) {
    const id = parseInt(req.params.id);
    const deleted = BookProxy.destroy(id);

    if (!deleted) {
        return res.status(404).json({ message: "Livre non trouvé" });
    }

    res.json({ message: "Livre supprimé", deleted });
}

module.exports = {
    getAllBooks,
    getBookById,
    addBook,
    updateBook,
    deleteBook,
};
