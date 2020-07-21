const usersRouter = require('express').Router();
const { getUsers, getUserById } = require('../controllers/users');

usersRouter.get('/', getUsers);
usersRouter.get('/:id', getUserById);

module.exports = usersRouter;
