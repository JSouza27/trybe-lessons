const connection = require('./connection');
const Author = require('./Author');

const getAll = async () => {
  const [book] = await connection.execute(
    'SELECT * FROM model_example.books'
  );

  return book;
};

const getByAuthorId = async (id) => {
  const [associatedBooks] = await connection.execute(
    'SELECT * FROM model_example.books WHERE author_id=?', [id]
  );

  return associatedBooks;
};

const getByBookId = async (id) => {
  const query = 'SELECT * FROM model_example.books WHERE id=?';
  const [findById] = await connection.execute(query, [id]);

  if (findById.length === 0) return null;

  return findById;
};

const isValid = async (title, author_id) => {
  if (!title || typeof title !== 'string' || title.length < 3) return false;
  if (!author_id || typeof author_id !== 'number' || !(await Author.findById(author_id)) ) return false;

  return true;
};

const create = async (title, author_id) => connection.execute(
    'INSERT INTO model_example.books (title, author_id) VALUES (?, ?)',
    [title, author_id],
);


module.exports = {
  getAll,
  getByAuthorId,
  getByBookId,
  isValid,
  create,
};
