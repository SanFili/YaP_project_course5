const usersRouter = require("express").Router();
const userId = require("express").Router();
const fs = require('fs');
const path = require('path');

const users = (cb) => {
  const filepath = path.join(__dirname, '../data/users.json');
  fs.readFile(filepath, { encoding: 'utf8' }, (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    cb(JSON.parse(data))
  })
};

usersRouter.get('/users', (req, res) => {
  users(data => res.send(data));
});

userId.get('/users/:id', (req, res) => {
  users(data => {
    let found = false;
    data.forEach((el) => {
      // eslint-disable-next-line no-underscore-dangle
      if (el._id === req.params.id) {
        res.send(el);
        found = true;
      }
    })
    if (!found) {
      res.status(404).send({ "message": "Нет пользователя с таким id" })
    }
  })
})

module.exports = { usersRouter, userId };
