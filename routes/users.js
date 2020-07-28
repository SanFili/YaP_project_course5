const usersRouter = require('express').Router();
const { getUsers, getUserById } = require('../controllers/users');
const { celebrate, Joi } = require('celebrate');

usersRouter.get('/', getUsers);
usersRouter.get('/:id',
  celebrate({
    params: Joi.object().keys({
      id: Joi.string().alphanum().length(24),
    }),
  }),
  getUserById);

module.exports = usersRouter;
