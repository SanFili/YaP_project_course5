//класс для всплывающего окна
class Popup {
  constructor(popupElement, userName, userAbout, inputName, inputAbout) {
    this.popupElement = popupElement;
    this.userName = userName;
    this.userAbout = userAbout;
    this.inputName = inputName;
    this.inputAbout = inputAbout;
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.popupElement.querySelector('.popup__close').addEventListener('click', this.close);
  }

  open() {
    this.popupElement.classList.add('popup_is-opened');
    if (this.popupElement.classList.contains('popup-edit')) {
      this.inputName.value = this.userName.textContent;
      this.inputAbout.value = this.userAbout.textContent;
    }
  }

  close() {
    this.popupElement.classList.remove('popup_is-opened');
    if (!this.popupElement.classList.contains('popup-img')) {
      if (!this.popupElement.classList.contains('popup-edit')) {
        this.popupElement.querySelector('.popup__form').reset();
      } 
      this.popupElement.querySelector('.popup__button').classList.remove('popup__button_active');
      const errorElements = this.popupElement.querySelectorAll('.error-msg');
      errorElements.forEach((el) => {
        el.textContent = " ";
      })
    }
  }

  setEventListeners(openButton) {
    openButton.addEventListener('click', this.open);
  }

  setListenersForImg(openButton) {
    openButton.addEventListener('click', (event) => {
      if (event.target.classList.contains('place-card__image')) {
        this.open();
        let imgValue = event.target.dataset.url;
        const bigImg = document.querySelector('.popup-img__full-img');
        bigImg.setAttribute('src', imgValue);
      }
    })
  }

  addNewCard(form, validator, cardElem, list) {
    const errorMsg = {
      emptyInput: "Это обязательное поле",
      validationLength: "Должно быть от 2 до 30 символов"
    };
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const inputs = Array.from(form.elements);
      let formIsValid = true;
      inputs.forEach((element) => {
        if (!element.classList.contains('button')) {
          if (!validator.checkInputValidity(element, errorMsg)) {
            formIsValid = false;
          }
        }
      })
      if (formIsValid) {
        list.newCard(cardElem, form.elements.link.value, form.elements.name.value, form);
      }
    });
  }
};
