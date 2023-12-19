import './index.css';

import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import { UserInfo } from "../components/UserInfo.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { Section } from "../components/Section.js";

const profileEditButtonEl = document.querySelector('.profile__edit-button');
const nameProfileInputEl = document.querySelector('#name-profile-input');
const infoProfileInputEl = document.querySelector('#info-profile-input');
const formProfileEl = document.forms["profile-form"];
const cardsSection = document.querySelector('.elements');
const profileAddButtonEl = document.querySelector('.profile__add-button');
const formCardEl = document.forms["card-form"];

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  fieldsetSelector: '.popup__set',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

const formProfileValidation = new FormValidator(validationConfig, formProfileEl);
formProfileValidation.enableValidation();
formProfileValidation.disableButton();

const formCardValidation = new FormValidator(validationConfig, formCardEl);
formCardValidation.enableValidation();
formCardValidation.disableButton();

function createCard(items) {
  const cardElement = new Card(items, '#card-template', handleCardClick); //Создание новой карточки с заданными значениями
  return cardElement.getView();
};

const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  infoSelector: '.profile__title'
});

const popupWithImage = new PopupWithImage('#popup-image');
popupWithImage.setEventListeners();

//Открытие попапа редактироsвания профиля по клику на кнопку редактирования
profileEditButtonEl.addEventListener('click', () => {
  popupEditProfile.open();
  const profileInfo = userInfo.getUserInfo();

  nameProfileInputEl.value = profileInfo.name;
  infoProfileInputEl.value = profileInfo.info;
});

const popupEditProfile = new PopupWithForm('#popup-profile', value => {
  userInfo.setUserInfo({
    name: value['name-profile-input'],
    info: value['info-profile-input']
});
  popupEditProfile.close();
});
popupEditProfile.setEventListeners();

profileAddButtonEl.addEventListener('click', () => {
  popupEditCard.open();
  formCardValidation.disableButton();
});

const popupEditCard = new PopupWithForm('#popup-place', value => {
  const card = {
    name: value['name-place-input'],
    link: value['info-place-input']
  };
  section.addItem(createCard(card));
  popupEditCard.close();
});
popupEditCard.setEventListeners();

const section = new Section (
  {
    items: initialCards,
    renderer: renderCard

  },
  cardsSection
);
section.renderItems();


function handleCardClick(name, link) {
  popupWithImage.open(name, link);
};

function renderCard(item) {
  const newCard = createCard(item);
  section.addItem(newCard);
}
