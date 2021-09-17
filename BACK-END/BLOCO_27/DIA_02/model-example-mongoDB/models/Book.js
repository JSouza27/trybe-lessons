const connection = require('./connection');
const { ObjectId } = require('mongodb');

const getAll = () => {
  return connection()
    .then((db) => db.collection('books').find({}).toArray())
      .then((books) => books);
};

const getByAuthorId = (id) => {
  return connection()
    .then((db) => db.collection('books').find({ author_id: Number(id)}).toArray());
};

const getByBookId = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const findById = await connection()
    .then((db) => db.collection('books').findOne(new ObjectId(id)));

  if (!findById) return null;

  return findById;
};

const create = (title, author_id) => connection()
  .then((db) => db.collection('books').insertOne({ title, author_id }));


module.exports = {
  getAll,
  getByAuthorId,
  getByBookId,
  create,
};
