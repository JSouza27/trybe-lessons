const models = require('../models/Book');
// const Author = require('./Author');

// const isValid = async (title, author_id) => {
//   if (!title || typeof title !== 'string' || title.length < 3) return false;
//   if (!author_id || typeof author_id !== 'string' || !(await Author.findById(author_id)) ) return false;

//   return true;
// };

const getAll = async () => models.getAll();

const getByAuthorId = async (id) => {
  const getAuthor = await models.getByAuthorId(id);

  if (!getAuthor) {
    return {
      error: {
        code: 'notFound',
        message: 'Autor não encontrado',
      },
    };
  }

  return getAuthor;
};

const getByBookId = async (id) => {
  const book = await models.getByBookId(id);

  if (!book) {
    return {
      error: {
        code: 'notFound',
        message: 'Livro não encontrado',
      },
    };
  };

  return book;
};

const create = async (title, author_id) => {
  const creatBook = await models.create(title, author_id);

  if (!creatBook) {
    return {
      error: {
        code: 'notFound',
        message: 'Autor não encontrado',
      },
    };
  }

  return creatBook;
};

module.exports = {
  getAll,
  getByAuthorId,
  getByBookId,
  create,
  // isValid,
};
