const cardsRouter = require('express').Router();

const { getCards, createCard, deleteCard } = require('../controllers/cards');
const { celebrate, Joi } = require('celebrate');

cardsRouter.get('/', getCards);
cardsRouter.post('/', createCard);
cardsRouter.delete('/:id',
  celebrate({
    params: Joi.object().keys({
      id: Joi.string().alphanum().length(24),
    }),
  }),
  deleteCard);

module.exports = cardsRouter;
