const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-request-err');
const AuthError = require('../errors/auth-err');

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.status(200).send({ data: users }))
    .catch((err) => next(err));
};

module.exports.getUserById = (req, res, next) => {
  User.findById(req.params.id).orFail()
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        next(new NotFoundError('Нет пользователя с таким id'));
      } else if (err.name === 'CastError') {
        next(new BadRequestError('Передан невалидный id'));
      } else {
        next(err);
      }
    });
};

module.exports.createUser = (req, res, next) => {
  // eslint-disable-next-line object-curly-newline
  const { email, password, name, about, avatar } = req.body;
  bcrypt.hash(password, 10)
  // eslint-disable-next-line object-curly-newline
    .then((hash) => User.create({ email, password: hash, name, about, avatar })
      .then(() => res.status(200).send({ message: 'Вы успешно зарегестрированы!' }))
      .catch((err) => {
        if (err.name === 'ValidationError') {
          next(new BadRequestError('Переданы невалидные данные'));
        } else {
          next(new BadRequestError('Такой пользователь уже зарегистрирован'));
        }
      }))
    .catch((err) => next(err));
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'some-key', { expiresIn: '7d' });
      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
      });
      res.status(200).send({ message: 'Аутентификация прошла успешно' });
    })
    .catch((err) => {
      next(new AuthError(err.message));
    });
};
