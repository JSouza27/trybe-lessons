const Joi = require('joi');
const rescue = require('express-rescue');
const services = require('../services/Book');

const getAll = rescue(async (req, res) =>  {
  const books = await services.getAll();

  return res.status(200).json(books);
});

const getByAuthorId = rescue(async (req, res, next) => {
  const { id } = req.query;
  const book = await services.getByAuthorId(id);

  return res.status(200).json(book);
});

const getByBookIdAll = rescue(async (req, res, next) => {
  const { id } = req.params;
  const bookSearch = await services.getByBookId(id);

  if (bookSearch.error) return next(bookSearch.error);

  return res.status(200).json(bookSearch);
});

const create = rescue(async (req, res, next) => {

  const { error } = Joi.object({
    title: Joi.string().not().empty().required(),
    author_id: Joi.number().not().empty().required(),
  }).validate(req.body);

  if (error) return next(error);

  const { title, author_id } = req.body;

  await services.create(title, author_id);

  return res.status(201).json({ message: 'Livro criado com sucesso! '});
});

module.exports = {
  getAll,
  getByAuthorId,
  getByBookIdAll,
  create,
};
