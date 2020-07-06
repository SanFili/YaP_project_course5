const usersRouter = require('express').Router();
const userId = require('express').Router();
const fs = require('fs').promises;
const path = require('path');

const users = (cbOk, cbErr) => {
  const filepath = path.join(__dirname, '../data/users.json');
  fs.readFile(filepath, { encoding: 'utf8' })
    .then((data) => {
      cbOk(JSON.parse(data));
    })
    .catch((err) => {
      cbErr(err.message);
    });
};

usersRouter.get('/users', (req, res) => {
  users((data) => { res.send(data); }, (err) => { res.status(500).send(err); });
});

userId.get('/users/:id', (req, res) => {
  users((data) => {
    let found = false;
    data.forEach((el) => {
      if (el._id === req.params.id) {
        res.send(el);
        found = true;
      }
    });
    if (!found) {
      res.status(404).send({ message: 'Нет пользователя с таким id' });
    }
  }, (err) => { res.status(500).send(err); });
});

module.exports = { usersRouter, userId };
