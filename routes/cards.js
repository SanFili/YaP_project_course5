const cardsRouter = require("express").Router();
const fs = require('fs').promises;
const path = require('path');
const filepath = path.join(__dirname, '../data/cards.json');

const cards = (cbOk, cbErr) => {
  fs.readFile(filepath, { encoding: 'utf8' })
    .then((data) => {
      cbOk(JSON.parse(data))
    })
    .catch((err) => {
      cbErr(err.message)
    })
};

cardsRouter.get('/cards', (req, res) => {
  cards((data) => {res.send(data)}, (err) => {res.status(500).send(err)});
});

module.exports = cardsRouter;
