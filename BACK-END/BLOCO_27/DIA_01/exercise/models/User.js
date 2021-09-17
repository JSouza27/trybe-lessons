const connection = require('./connection');
const { ObjectId } = require('mongodb');

const isValid = (document) => {
  const { firstName, lastName, email, password } = document;

  if (!firstName && !lastName && !email && !password) return null;

  if (typeof password !== 'string' || password.length < 6) return null;

  return true;
};

const createUser = ({ firstName, lastName, email, password }) => {
  return connection()
    .then((db) => db.collection('users')
      .insertOne({ firstName, lastName, email, password }))
      .then((result) => ({
        id: result.insertedId,
        firstName,
        lastName,
        email,
      }));
};

const getAll = () => {
  const allDocuments = connection()
    .then((db) => db.collection('users').find({}).toArray());

  if (!allDocuments || allDocuments.length === 0) return [];

  return allDocuments;
};

const getUserById = (userId) => {
  if (!ObjectId.isValid(userId)) return null;

  const result = connection()
    .then((db) => db.collection('users').findOne(new ObjectId(userId)));

  if (!result) return null;

  return result;
};

const userUpdate = ({ id, firstName, lastName, email, password }) => {
  if (!ObjectId.isValid(id)) return null;

  return connection()
    .then((db) => db.collection('users').updateOne(
      { _id: ObjectId(id) },
      { $set: { firstName, lastName, email, password } }
      ))
    .then((result) => ({
      id: result.insertedId,
      firstName,
      lastName,
      email,
    }));
};

module.exports = {
  isValid,
  createUser,
  getAll,
  getUserById,
  userUpdate,
};
