const cardsRouter = require('express').Router();
const fs = require('fs').promises;

const { getCards, createCard, deleteCard } = require('../controllers/cards');

cardsRouter.get('/', getCards);
cardsRouter.post('/', createCard);
cardsRouter.delete('/:id', deleteCard);

module.exports = cardsRouter;
