const cardsRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getCards, createCard, deleteCard } = require('../controllers/cards');

cardsRouter.get('/', getCards);
cardsRouter.post('/', createCard);
cardsRouter.delete('/:id',
  celebrate({
    params: Joi.object().keys({
      id: Joi.string().hex().length(24),
    }),
  }),
  deleteCard);

module.exports = cardsRouter;
