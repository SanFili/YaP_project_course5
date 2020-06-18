//класс для хранения и отрисовки карточек
class CardList {
  constructor(container, api, popup) {
    this.container = container;
    this.api = api;
    this.popup = popup;
  }

  addCard(cardElem, cardData) {
    this.container.appendChild(cardElem.create(cardData))
  }

  newCard(cardElem, link, name, form) {
    this.api.postNewCard(name, link)
      .then((res) => {
        this.addCard(cardElem, res);
        this.popup.close();
        form.reset();
      })
      .catch(err => console.log(err));
  }

  render(cardElem) {
    this.api.getInitialCards()
      .then((cards) => {
        for (let card of cards) {
          this.addCard(cardElem, card);
        }
      })
      .catch(err => console.log(err));
  }
};