const Card = require('../models/card');
const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-request-err');
const ForbiddenError = require('../errors/forbidden-err');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы невалидные данные'));
      } else {
        res.status(500).send({ message: err.message });
      }
    });
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.id)
    .orFail()
    .then((card) => {
      if (card.owner.toString() === req.user._id) {
        Card.findByIdAndRemove(req.params.id)
          .then((foundCard) => {
            if (foundCard !== null) {
              res.status(200).send({ data: foundCard });
            } else {
              next(new NotFoundError('Карточка не найдена'));
            }
          })
          .catch((err) => res.status(500).send({ message: err.message }));
      } else {
        next(new ForbiddenError('К сожалению, Вы не можете удалить данную карточку'))
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Передан невалидный id'));
      } else if (err.name === 'DocumentNotFoundError') {
        next(new NotFoundError('Карточка не найдена'));
      } else {
        res.status(500).send({ message: err.name });
      }
    });
};
