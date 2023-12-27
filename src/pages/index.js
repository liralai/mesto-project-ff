import "./index.css";
import { initialCards } from "../scripts/cards.js";
import { closePopup, openPopup } from "../scripts/modal.js";
import { renderCard, likeCard, deleteCard } from "../scripts/card.js";
import { disableButton } from "../scripts/validate.js";

const profileEditButtonEl = document.querySelector('.profile__edit-button');
const popupProfileEl = document.querySelector('#popup-profile');
const nameProfileInputEl = document.querySelector('#name-profile-input');
const infoProfileInputEl = document.querySelector('#info-profile-input');
const profileNameEl = document.querySelector('.profile__name');
const profileTitleEl = document.querySelector('.profile__title');
const formProfileEl = document.forms["profile-form"];
const imageEl = document.querySelector('.popup-image__image');
const imageTitleEl = document.querySelector('.popup-image__title');
const cardsSection = document.querySelector('.elements');
const popupPlaceEl = document.querySelector('#popup-place');
const profileAddButtonEl = document.querySelector('.profile__add-button');
const formCardEl = document.forms["card-form"];
const namePlaceInputEl = document.querySelector('#name-place-input');
const infoPlaceInputEl = document.querySelector('#info-place-input');
const popupImageEl = document.querySelector('#popup-image');
const closeButtons = document.querySelectorAll('.popup__close-button');
const profileFormSubmitButton = formProfileEl.querySelector('.popup__save-button');
const cardFormSubmitButton = formCardEl.querySelector('.popup__save-button');

//Открытие карточки на весь экран
const openImagePopup = (src, title) => {
  imageTitleEl.textContent = title;
  imageEl.src = src;
  imageEl.alt = title;
  openPopup(popupImageEl);
};

//Открытие попапа редактирования профиля по клику на кнопку редактирования
profileEditButtonEl.addEventListener('click', function() {
  openPopup(popupProfileEl);

  nameProfileInputEl.value = profileNameEl.textContent;
  infoProfileInputEl.value = profileTitleEl.textContent;
});

//Сохранение изменений в попапе по клику на кнопку Сохранить
formProfileEl.addEventListener('submit', function(event) {

  event.preventDefault();

  profileNameEl.textContent = nameProfileInputEl.value;
  profileTitleEl.textContent = infoProfileInputEl.value;

  closePopup(popupProfileEl);

  disableButton(profileFormSubmitButton);
});

//Создание карточки для каждого элемента массива
initialCards.forEach((item) => {
  renderCard(item, cardsSection, likeCard, deleteCard, openImagePopup, 'end' )
});

//Открытие попапа добавления карточки по клику на кнопку редактирования
profileAddButtonEl.addEventListener('click', function() {
  openPopup(popupPlaceEl);
});

//Добавление новой карточки через форму
formCardEl.addEventListener('submit', function(event) {
  event.preventDefault();

  //Запись в константу значений из полей формы
  const value =
    {
      name: namePlaceInputEl.value,
      link: infoPlaceInputEl.value
    }

  renderCard(value, cardsSection, likeCard, deleteCard, openImagePopup, 'start' )
  closePopup(popupPlaceEl);

  event.target.reset();

  disableButton(cardFormSubmitButton);
});

//Функция закрытия попапа по клику на крестик
closeButtons.forEach((button) => {
  const closeButton = button.closest('.popup');
  button.addEventListener('click', () => closePopup(closeButton));
});

export { openImagePopup };
