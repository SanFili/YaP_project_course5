const usersRouter = require('express').Router();
const path = require('path');

const filepath = path.join(__dirname, '../data/users.json');
// eslint-disable-next-line import/no-dynamic-require
const users = require(filepath);

usersRouter.get('/', (req, res, next) => {
  res.send(users);
  next();
});

usersRouter.get('/:id', (req, res, next) => {
  let found = false;
  users.forEach((el) => {
    // eslint-disable-next-line no-underscore-dangle
    if (el._id === req.params.id) {
      res.send(el);
      found = true;
    }
  });
  if (!found) {
    res.status(404).send({ message: 'Нет пользователя с таким id' });
  }
  next();
});

module.exports = usersRouter;
