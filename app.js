const express = require('express');
const path = require("path");
const { PORT = 3000 } = process.env;
const app = express();
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

app.use(express.static(path.join(__dirname, "public")));
app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

app.listen(PORT)

