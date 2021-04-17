const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

const produtosRoutes = require('./routes/produtos');

// DATABASE
mongoose.connect(
  `mongodb+srv://mateus-leite:unidesc@unidesc.ux21s.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true,
  }
);

// CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );

  if (req.method == 'OPTIONS') {
    req.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATH, DELETE');
    return res.status(200).json({});
  }

  next();
});

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/produtos', produtosRoutes);

app.use((req, res, next) => {
  const error = new Error('not found');
  error.status = 404;

  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);

  res.json({
    error: error.message,
  });
});

module.exports = app;
