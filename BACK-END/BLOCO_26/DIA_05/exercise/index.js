const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRouter = require('./userRouter');
const btcRouter = require('./btcRouter');

const PORT = 3005;
const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use('/btc', btcRouter);
app.use('/user', userRouter);

app.all('*', (req, res) => {
  return res.status(404).json({ message: `Rota ${ req.path } não existe!`});
});

app.listen(PORT, () => console.log('Aplicação ouvindo na porta 3005'));
