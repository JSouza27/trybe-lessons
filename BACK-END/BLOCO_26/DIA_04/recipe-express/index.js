const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const recipes = [
  { id: 1, name: 'Lasanha', price: 40.0, waitTime: 30 },
  { id: 2, name: 'Macarrão a Bolonhesa', price: 35.0, waitTime: 25 },
  { id: 3, name: 'Macarrão com molho branco', price: 35.0, waitTime: 25 },
];

const drinks = [
  { id: 1, name: 'Refrigerante Lata', price: 5.0 },
  { id: 2, name: 'Refrigerante 600ml', price: 8.0 },
  { id: 3, name: 'Suco 300ml', price: 4.0 },
  { id: 4, name: 'Suco 1l', price: 10.0 },
  { id: 5, name: 'Cerveja Lata', price: 4.5 },
  { id: 6, name: 'Água Mineral 500 ml', price: 5.0 },
];

// app.get('/recipes', (req, res) => {
//   res.json(recipes);
// });

// app.get('/drinks', (req, res) => {
//   res.json(drinks);
// });

app.get('/recipes/search', (req, res) => {
  const { name, maxPrice } = req.query;
  const filteredRecipes = recipes.filter((r) => r.name.includes(name) && r.price < parseInt(maxPrice));

  res.status(200).json(filteredRecipes);
});

app.get('/drinks/search', (req, resp) => {
  const { name, maxPrice } = req.query;
  const filteredDrinks = drinks.filter((d) => d.name.includes(name) && d.price < parseInt(maxPrice));

  resp.status(200).json(filteredDrinks);
 });

app.get('/recipes/:id', (req, res) => {
  const { id } = req.params;
  const recipe = recipes.find((r) => r.id === parseInt(id));

  if(!recipe) return res.status(404).json({ message: 'Recipe not found!' });

  res.status(200).json(recipe);
});

app.get('/drinks/:id', (req, res) => {
  const { id } = req.params;
  const drink = drinks.find((d) => d.id === parseInt(id));

  if(!drink) return res.status(404).json({ message: 'Recipe not found!' });

  res.status(200).json(drink);
});

app.get('/validateToken', function (req, res) {
  const { id, nome, preco } = req.body;
  const token = req.headers.authorization;

  if (token.length !== 16) return res.status(401).json({message: 'Invalid Token!'});

  res.status(200).json({message: 'Valid Token!'});
});

app.post('/recipes', (req, res) => {
  const { id, name, price } = req.body;

  recipes.push({ id, name, price });
  res.status(201).json({ message: 'Recipe created successfully!'});
});


app.listen(3001, () => {
  console.log('Aplicação ouvindo na porta 3001');
});
