let booksDB = require('../data/booksDB');

function getAllBooks() {
    return booksDB;
}

function getBookById(id) {
    return booksDB.find(book => book.id === id) || null;
}

function addBook(title, author) {
    const newBook = {
        id: booksDB.length ? booksDB[booksDB.length - 1].id + 1 : 1,
        title,
        author,
    };

    booksDB.push(newBook);
    return newBook;
}

function updateBook(id, title, author) {
    const index = booksDB.findIndex(book => book.id === id);
    if (index === -1) return null;

    const updated = { id, title, author };
    booksDB[index] = updated;
    return updated;
}

function deleteBook(id) {
    const index = booksDB.findIndex(book => book.id === id);
    if (index === -1) return null;

    const deleted = booksDB.splice(index, 1);
    return deleted[0];
}

module.exports = {
    getAllBooks,
    getBookById,
    addBook,
    updateBook,
    deleteBook,
};
