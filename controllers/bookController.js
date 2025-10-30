const BookProxy = require('../proxies/bookProxy');

function getAllBooks(req, res) {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const params = { page, limit };

    const books = BookProxy.getAll(params);
    res.json(books);
}

function getBookById(req, res) {
    const id = parseInt(req.params.id);
    const book = BookProxy.getById(id);

    if (!book) {
        return res.status(404).json({ message: "Livre non trouvé" });
    }

    res.json(book);
}

function addBook(req, res) {
    const { title, author } = req.body;

    if (!title || !author) {
        return res.status(400).json({ message: "Titre et auteur sont requis." });
    }

    const newBook = BookProxy.add(title, author);
    res.status(201).json(newBook);
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

    res.json(updated);
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
