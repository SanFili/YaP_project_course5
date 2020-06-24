const express = require('express');
const path = require("path");
const { PORT = 3000 } = process.env;
const app = express();
const users = require('./routes/users');
const usersRouter = users.usersRouter;
const userId = users.userId;
const cardsRouter = require('./routes/cards');

app.use(express.static(path.join(__dirname, "public")));
app.use('/', usersRouter);
app.use('/', cardsRouter);
app.use('/', userId);
app.use((req, res) => {
  if (!res.headersSent) {
    res.status(404).send({ "message": "Запрашиваемый ресурс не найден" })
  }
})

app.listen(PORT)

