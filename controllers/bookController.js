const BookService = require('../services/bookService');

function getAllBooks(req, res) {
    const books = BookService.getAllBooks();
    res.json(books);
}

function getBookById(req, res) {
    const id = parseInt(req.params.id);
    const book = BookService.getBookById(id);

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

    const newBook = BookService.addBook(title, author);
    res.status(201).json(newBook);
}

function updateBook(req, res) {
    const id = parseInt(req.params.id);
    const { title, author } = req.body;

    if (!title || !author) {
        return res.status(400).json({ message: "Titre et auteur sont requis." });
    }

    const updated = BookService.updateBook(id, title, author);

    if (!updated) {
        return res.status(404).json({ message: "Livre non trouvé" });
    }

    res.json(updated);
}

function deleteBook(req, res) {
    const id = parseInt(req.params.id);
    const deleted = BookService.deleteBook(id);

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
