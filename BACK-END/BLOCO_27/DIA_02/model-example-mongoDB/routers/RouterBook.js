const express = require('express');
const Book = require('../controllers/BooksController');

const router = express.Router();

router.get('/search', Book.getByAuthorId);

router.get('/:id', Book.getByBookIdAll);

router.get('/', Book.getAll);

router.post('/', Book.create);

module.exports = router;
