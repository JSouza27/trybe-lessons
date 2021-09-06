const express = require('express');
const bodyParse = require('body-parser');
const fs = require('fs').promises;

const PORT = '3001';
const file = 'simpsons.json';
const app = express();
app.use(bodyParse.json());

const readJson = async () => {
  const readFile = await fs.readFile(file, 'utf8');
  const convertInObj = await JSON.parse(readFile);

  return convertInObj;
};

app.get('/simpsons', async (_req, res) => {
  const readFile = await readJson()

  return res.status(200).json(readFile);
});

app.get('/simpsons/:id', async (req, res) => {
  const readFile = await readJson();
  const { id } = req.params;

  const result = readFile.find((person) => parseInt(person.id, 10) === parseInt(id, 10));

  if (!result) {
    return res.status(404).json({ message: 'simpson not found' });
  }

  return res.status(200).json(result);
  
});

app.post('/simpsons', async (req, res) => {
  const readFile = await readJson();
  const { id, name } = req.body;
  
  const person = readFile.indexOf((person) => parseInt(person.id, 10) === parseInt(id, 10));

  if(person !== -1) {
    return res.status(409).json({ message: 'id already exists' });
  }

  readFile.push({ id, name });
  const convertString = JSON.stringify(readFile);

  const writeFile = fs.writeFile(file, convertString)
  return res.status(204).end();
});

app.listen(PORT, () => console.log(`Aplicação ouvindo a porta ${ PORT }`));
