const express = require('express');
const bodyParser = require('body-parser');
const { RouterBook, RouterAuthor } = require('./routers');
const errorMiddleware = require('./middlewares/error');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(errorMiddleware);

app.use('/authors', RouterAuthor);
app.use('/books', RouterBook);

app.listen(PORT, () => {
  console.log(`Ouvindo a porta ${ PORT }`)
});
