const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданы невалидные данные' });
      } else {
        res.status(500).send({ message: err.message });
      }
    });
};

module.exports.deleteCard = (req, res) => {
  Card.findById(req.params.id)
    .orFail()
    .then((card) => {
      if (card.owner.toString() === req.user._id) {
        Card.findByIdAndRemove(req.params.id)
          .then((foundCard) => {
            if (foundCard !== null) {
              res.status(200).send({ data: foundCard });
            } else {
              res.status(404).send({ message: 'Карточка не найдена' });
            }
          })
          .catch((err) => res.status(500).send({ message: err.message }));
      } else {
        res.status(403).send({ message: 'К сожалению, Вы не можете удалить данную карточку' });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Передан невалидный id'})
      } else if (err.name === 'DocumentNotFoundError') {
        res.status(404).send({ message: 'Карточка не найдена' });
      } else {
        res.status(500).send({ message: err.name });
      }
    });
};
