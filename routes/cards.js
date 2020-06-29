const cardsRouter = require('express').Router();
const path = require('path');

const filepath = path.join(__dirname, '../data/cards.json');
// eslint-disable-next-line import/no-dynamic-require
const cards = require(filepath);

cardsRouter.get('/', (req, res) => {
  res.send(cards);
});

module.exports = cardsRouter;
