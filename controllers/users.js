const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send({ data: users }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.id).orFail()
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        res.status(404).send({ message: 'Нет пользователя с таким id' });
      } else if (err.name === 'CastError') {
        res.status(400).send({ message: 'Передан невалидный id' });
      } else {
        res.status(500).send({ message: err.message });
      }
    });
};

module.exports.createUser = (req, res) => {
  // eslint-disable-next-line object-curly-newline
  const { email, password, name, about, avatar } = req.body;
  bcrypt.hash(password, 10)
  // eslint-disable-next-line object-curly-newline
    .then((hash) => User.create({ email, password: hash, name, about, avatar })
      .then(() => res.status(200).send({ message: 'Вы успешно зарегестрированы!' }))
      .catch((err) => {
        if (err.name === 'ValidationError') {
          res.status(400).send({ message: 'Переданы невалидные данные' });
        } else {
          res.status(400).send({ message: 'Такой пользователь уже зарегистрирован' });
        }
      }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.login = (req, res) => {
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
      res.status(401).send({ message: err.message });
    });
};
