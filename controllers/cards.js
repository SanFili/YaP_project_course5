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
    })
};

module.exports.deleteCard = (req, res) => {
  Card.findById(req.params.id)
    .orFail(() => res.status(404).send({ message: 'Карточка не найдена' }))
    .then((card) => {
      if (card.owner.toString() === req.user._id) {
        Card.findByIdAndRemove(req.params.id)
          .then((card) => {
            if (card !== null) {
              res.send({ data: card });
            }
          })
          .catch((err) => res.status(500).send({ message: err.message }))
      } else {
        res.status(400).send({ message: 'К сожалению, Вы не можете удалить данную карточку'});
      }
    })
    .catch((err) => res.status(500).send({ message: err.message }));
};
