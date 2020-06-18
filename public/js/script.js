(function() {

const api = new Api({
    baseUrl: 'https://praktikum.tk/cohort10',
    headers: {
        authorization: 'dd49ada9-2c07-49c8-aa55-904252b17aa8',
        'Content-Type': 'application/json'
    }
});

const myId = "816d76680ac982a64b0f35b9"
const card = new Card(api, myId);

const errorMsg = {
    emptyInput: "Это обязательное поле",
    validationLength: "Должно быть от 2 до 30 символов"
};

const userName = document.querySelector(".user-info__name");
const userAbout = document.querySelector(".user-info__job");
const userPhoto = document.querySelector(".user-info__photo");
const inputName = document.querySelector('.popup__input_type_name');
const inputAbout = document.querySelector('.popup__input_type_about');

//попап с картинкой
const popupImage = new Popup(document.querySelector('.popup-img'));
popupImage.setListenersForImg(document.querySelector('.places-list'));

//попап редактирования информации
const popupEditInfo = new Popup(document.querySelector('.popup-edit'), userName, userAbout, inputName, inputAbout);
popupEditInfo.setEventListeners(document.querySelector('.user-info__edit-button'));

//редактирование информации
const editInfo = new UserInfo(document.querySelector('.popup__form_edit'), api, userName, userAbout, userPhoto, inputName, inputAbout, popupEditInfo);
editInfo.defaultInfo();

//попап редактирования автара
const popupEditAvatar = new Popup(document.querySelector('.popup-avatar'), userName, userAbout, inputName, inputAbout);
popupEditAvatar.setEventListeners(document.querySelector('.user-info__photo'));

//редактированиe автара
const editAvatar = new UserInfo(document.querySelector('.popup__form_avatar'), api, userName, userAbout, userPhoto, inputName, inputAbout, popupEditAvatar);

//валидация
const validateForm = new FormValidator(document.querySelector('.popup__form'), errorMsg);
const validateEditForm = new FormValidator(document.querySelector('.popup__form_edit'), errorMsg);
const validateAvatar = new FormValidator(document.querySelector('.popup__form_avatar'), errorMsg);
validateEditForm.setListenersForUserInfo(editInfo);
validateAvatar.setListenersForAvatar(editAvatar);

//попап нового места
const popupPlace = new Popup(document.querySelector('.popup'));
popupPlace.setEventListeners(document.querySelector('.user-info__button'));

const cardList = new CardList(document.querySelector('.places-list'), api, popupPlace);
cardList.render(card);

popupPlace.addNewCard(document.querySelector('.popup__form'), validateForm, card, cardList);

}) ();


