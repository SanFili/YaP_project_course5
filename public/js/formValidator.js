//валидация форм
class FormValidator {
  constructor(popupElem, msg) {
    this.popupElem = popupElem;
    this.msg = msg;
    this.setEventListeners();
  }

  checkInputValidity(elem) {
    if (!elem.classList.contains('button')) {
      const errorElement = document.querySelector(`#error-${elem.id}`);
      const length = elem.value.length;
      if (elem.value === "") {
        errorElement.textContent = this.msg.emptyInput;
        return false;
      } else if (!elem.classList.contains('popup__input_type_link-url')) {
        if (length < 2 || length > 30) {
          errorElement.textContent = this.msg.validationLength;
          return false;
        }
      }
      errorElement.textContent = " ";
      return true;
    }
  }

  setSubmitButtonState(formIsValid) {
    const popupButton = this.popupElem.querySelector('.popup__button');
    if (formIsValid) {
      popupButton.classList.add('popup__button_active');
    } else {
      popupButton.classList.remove('popup__button_active');
    }
  }

  setEventListeners() {
    this.popupElem.addEventListener('input', () => {
      const inputs = Array.from(this.popupElem.elements);
      let formIsValid = true;
      inputs.forEach((element) => {
        if (!element.classList.contains('button')) {
          if (!this.checkInputValidity(element)) {
            formIsValid = false;
          }
        }
      });
      this.setSubmitButtonState(formIsValid);
    })
  }

  setListenersForUserInfo(infoClass) {
    this.popupElem.addEventListener('submit', () => {
      event.preventDefault();
      const inputs = Array.from(this.popupElem.elements);
      let formIsValid = true;
      inputs.forEach((element) => {
        if (!element.classList.contains('button')) {
          if (!this.checkInputValidity(element)) {
            formIsValid = false;
          }
        }
      });
      if (formIsValid) {
        infoClass.setUserInfo(this.popupElem.elements.name.value, this.popupElem.elements.about.value);
      }
    })
  }

  setListenersForAvatar(infoClass) {
    this.popupElem.addEventListener('submit', () => {
      event.preventDefault();
      const inputs = Array.from(this.popupElem.elements);
      let formIsValid = true;
      inputs.forEach((element) => {
        if (!element.classList.contains('button')) {
          if (!this.checkInputValidity(element)) {
            formIsValid = false;
          }
        }
      });
      if (formIsValid) {
        infoClass.changeAvatar(this.popupElem.elements.link.value);
      }
    })
  }
};


