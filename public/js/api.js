class Api {
  constructor(options) {
    this.options = options;
  }

  // Очень хорошо, метод для общей проверки!
  checkAnswer(res) {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(res)
    .catch((err) => {
      return Promise.reject(new Error(`Ошибка: ${err.message}`))
    });
  }

  // загрузка информации о пользователе
  getUserInfo() {
    return fetch(`${this.options.baseUrl}/users/me`, {
      headers: {
        authorization: this.options.headers.authorization
      }
    })
    .then(res => this.checkAnswer(res));
  }

  // загрузка первоначальных карточек с сервера
  getInitialCards() {
    return fetch(`${this.options.baseUrl}/cards`, {
      headers: {
        authorization: this.options.headers.authorization
      }
    })
    .then(res => this.checkAnswer(res));
  }

  // сохранение отредактированных данных профиля
  saveEditedInfo(name, info) {
    return fetch(`${this.options.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this.options.headers.authorization,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        about: info
      })
    })
    .then(res => this.checkAnswer(res));
  }

  //добавление новой картошки
  postNewCard(name, link) {
    return fetch(`${this.options.baseUrl}/cards`, {
      method: 'POST',
      headers: {
        authorization: this.options.headers.authorization,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
    .then(res => this.checkAnswer(res));
  }

  //удаление карточки
  deleteCard(cardId) {
    return fetch(`${this.options.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this.options.headers.authorization
      }
    })
    .then(res => this.checkAnswer(res));
  }

  //проставление лайков
  likeCard(cardId) {
    return fetch(`${this.options.baseUrl}/cards/like/${cardId}`, {
      method: 'PUT',
      headers: {
        authorization: this.options.headers.authorization
      }
    })
    .then(res => this.checkAnswer(res));
  }

  //снятие лайка
  unlikeCard(cardId) {
    return fetch(`${this.options.baseUrl}/cards/like/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this.options.headers.authorization
      }
    })
    .then(res => this.checkAnswer(res));
  }

  //редактирование аватара
  editUserPhoto(avatar) {
    return fetch(`${this.options.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this.options.headers.authorization,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: avatar
      })
    })
    .then(res => this.checkAnswer(res));
  }
}
