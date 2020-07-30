const usersRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getUsers, getUserById } = require('../controllers/users');

usersRouter.get('/', getUsers);
usersRouter.get('/:id',
  celebrate({
    params: Joi.object().keys({
      id: Joi.string().hex().length(24),
    }),
  }),
  getUserById);

module.exports = usersRouter;
