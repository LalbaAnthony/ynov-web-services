let booksDB = require('../data/booksDB');

function getAll() {
    return booksDB;
}

function getById(id) {
    return booksDB.find(book => book.id === id) || null;
}

function add(title, author) {
    const newBook = {
        id: booksDB.length ? booksDB[booksDB.length - 1].id + 1 : 1,
        title,
        author,
    };

    booksDB.push(newBook);
    return newBook;
}

function update(id, title, author) {
    const index = booksDB.findIndex(book => book.id === id);
    if (index === -1) return null;

    const updated = { id, title, author };
    booksDB[index] = updated;
    return updated;
}

function destroy(id) {
    const index = booksDB.findIndex(book => book.id === id);
    if (index === -1) return null;

    const deleted = booksDB.splice(index, 1);
    return deleted[0];
}

module.exports = {
    getAll,
    getById,
    add,
    update,
    destroy,
};
