const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')

const path = require('path');

const { PORT = 3000 } = process.env;
const app = express();
const usersRouter = require('./routes/users');

const cardsRouter = require('./routes/cards');

mongoose.connect('mongodb://localhost:27017/mestodb', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});

app.use(bodyParser.json());

app.use((req, res, next) => {
  req.user = {
      _id: '5f05e1a911016c19e6a2c0fd'
  };

  next();
});

app.use(express.static(path.join(__dirname, 'public')));
app.use('/users', usersRouter);
app.use('/cards', cardsRouter);
app.use((req, res) => {
  if (!res.headersSent) {
    res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
  }
});

app.listen(PORT);
