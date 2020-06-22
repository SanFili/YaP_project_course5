const usersRouter = require("express").Router();
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

usersRouter.get('/', (req, res) => {
  users(data => res.send(data));
});

module.exports = usersRouter;
