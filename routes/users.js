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

function transform(arr) {
  arr.forEach(item => {
    item.id = item._id;
    delete item._id;
  })
  return arr
}

userId.get('/users/:id', (req, res) => {
  users(data => {
    transform(data)
    let er = 0;
    data.forEach(item => {
    if (item.id == req.params.id) {
      res.send(item)
      return er += 1;
    }
    })
    if (er == 0) {
      res.status(404).send({ "message": "Нет пользователя с таким id" })
    }
  })
})


module.exports = {usersRouter, userId};
