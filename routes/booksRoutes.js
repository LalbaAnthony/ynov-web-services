const express = require('express');
const router = express.Router();
let mockBookDB = require('../data/booksDB');

// GET - Récupérer tous les livres
router.get('/', (req, res) => {
    res.json(mockBookDB);
});

// GET - Un livre par ID
router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const book = mockBookDB.find(b => b.id === id);

    if (!book) {
        return res.status(404).json({ message: "Livre non trouvé" });
    }

    res.json(book);
});

// POST - Ajouter un livre
router.post('/', (req, res) => {
    const { title, author } = req.body;

    if (!title || !author) {
        return res.status(400).json({ message: "Titre et auteur sont requis." });
    }

    const newBook = {
        id: mockBookDB.length ? mockBookDB[mockBookDB.length - 1].id + 1 : 1,
        title,
        author,
    };

    mockBookDB.push(newBook);
    res.status(201).json(newBook);
});

// PUT - Mettre à jour un livre
router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { title, author } = req.body;

    const index = mockBookDB.findIndex(b => b.id === id);

    if (index === -1) {
        return res.status(404).json({ message: "Livre non trouvé" });
    }

    if (!title || !author) {
        return res.status(400).json({ message: "Titre et auteur sont requis." });
    }

    mockBookDB[index] = { id, title, author };
    res.json(mockBookDB[index]);
});

// DELETE - Supprimer un livre
router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = mockBookDB.findIndex(b => b.id === id);

    if (index === -1) {
        return res.status(404).json({ message: "Livre non trouvé" });
    }

    const deleted = mockBookDB.splice(index, 1);
    res.json({ message: "Livre supprimé", deleted: deleted[0] });
});

module.exports = router;
