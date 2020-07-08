const usersRouter = require('express').Router();
const userId = require('express').Router();
const fs = require('fs').promises;
const path = require('path');
const { getUsers, getUserById, createUser } = require('../controllers/users');

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

usersRouter.get('/', getUsers);
usersRouter.get('/:id', getUserById);
usersRouter.post('/', createUser);

module.exports = { usersRouter };
