const express = require('express');
const bodyParse = require('body-parser');
const User = require('./models/User');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(bodyParse.json());

app.post('/user', async (req, res) => {
  if (!User.isValid(req.body)) {
    return res.status(400).json({
      "error": true,
      "message": "O campo 'password' deve ter pelo menos 6 caracteres"
    });
  };

  const userCreated = await User.createUser(req.body);

  return res.status(201).json(userCreated);
});

app.get('/user/:id', async (req, res) => {
  const { id } = req.params;
  const findUser = await User.getUserById(id);

  if (!findUser) {
    return res.status(404).json( {
      "error": true,
      "message": "Usuário não encontrado"
  });
  }

  return res.status(200).json(findUser);
});

app.get('/user', async (_req, res) => {
  const allUsers = await User.getAll();

  return res.status(200).json(allUsers);
});

app.put('/user/:id', async (req, res) => {
  if (!User.isValid(req.body)) {
    return res.status(400).json({
      "error": true,
      "message": "O campo 'password' deve ter pelo menos 6 caracteres"
    });
  };

  const userUpdate = await User.userUpdate(res.body);

  if (!userUpdate) {
    return res.status(404).json(    {
      "error": true,
      "message": "Usuário não encontrado"
  });
  }

  return res.status(200).json(userUpdate);
});

app.listen(PORT, () => console.log(`Ouvindo a porta ${ PORT }`));
