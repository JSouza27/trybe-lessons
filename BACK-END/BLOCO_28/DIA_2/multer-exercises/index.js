require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const fs = require('fs');

const { PORT } = process.env;

const controllers = require('./controllers');
const middlewares = require('./middlewares');

const app = express();

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'uploads/');
  },
  filename: (req, file, callback) => {
    callback(null, Date.now() + '-' + file.originalname);
  },
});

const checkFile = (req, file, callback) => {
  const fileType = /png/;
  const extName = fileType.test((file.originalname).toLowerCase());
  const mimeType = fileType.test(file.mimetype);

  if (!mimeType && !extName) {
    req.fileValidationError = true;

    return callback(null, false);
  }

  return callback(null, true);
};

const fileExists = (req, fileName, callback) => {
  const files = fs.readdirSync(`${__dirname}/uploads`);
  
  const bool = files.some((file) => file === fileName); 

  if (bool) {
    req.fileDuplicated = true;

    return callback(null, false);
  }

  return callback(null, true);
}

const upload = multer({
  storage: storage,
  fileFilter: (req, file, callback) => {
    checkFile(req, file, callback);
    fileExists(req, file.filename, callback);
  },
});

app.use(
  cors({
    origin: `http://localhost:${PORT}`,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Authorization'],
  }),
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/ping', controllers.ping);

app.post('/upload', upload.single('file'), controllers.uploads);

app.use(express.static(`${ __dirname }/uploads`));
app.use(middlewares.error);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
