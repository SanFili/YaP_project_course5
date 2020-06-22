const cardsRouter = require("express").Router();
const fs = require('fs');
const path = require('path');

const cards = (cb) => {
  const filepath = path.join(__dirname, '../data/cards.json');
  fs.readFile(filepath, { encoding: 'utf8' }, (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    cb(JSON.parse(data))
  })
};

cardsRouter.get('/', (req, res) => {
  cards(data => res.send(data));
});

module.exports = cardsRouter;