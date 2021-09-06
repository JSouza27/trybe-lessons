const express = require('express');
const bodyParse = require('body-parser');

const PORT = '3000';
const app = express();
app.use(bodyParse.json());

app.get('/ping', (_req, res) => {
  res.json({ message: 'pong' });
});

app.post('/hello', (req, res) => {
  const { name } = req.body;
  return res.json({ "message": `Hello, ${ name }!` });
});

app.post('/greetings', (req, res) => {
  const { name, age } = req.body;

  if (parseInt(age, 10) <= 17) {
    return res.status(401).json({ "message": "Unauthorized" });
  }

  return res.status(200).json({ "message": `Hello, ${ name }!` });
});

app.put('/users/:name/:age', (req, res) => {
  const { name, age } = req.body;

  return res.json({ "message": `Seu nome é ${ name } e você tem ${ age } anos de idade` })
});

app.listen(PORT, () => console.log(`Aplicação ouvindo na porta ${ PORT }`));
