import { openImagePopup } from "../pages/index.js";

const cardTemplate = document.querySelector('#card-template').content;
const cardEl = cardTemplate.querySelector('.card');

//Функция создания карточки
const createCard = (value, likeCard, deleteCard, openImagePopup) => {
  const newCard = cardEl.cloneNode(true); //Клонирование содержимого template
  const cardImgEl = newCard.querySelector('.card__image');
  const titleEl = newCard.querySelector('.card__title');
  const deleteButton = newCard.querySelector('.card__delete-button');
  const likeButton = newCard.querySelector('.card__like-button');

  titleEl.textContent = value.name;
  cardImgEl.src = value.link;
  cardImgEl.alt = value.name;

  deleteButton.addEventListener('click', deleteCard);
  likeButton.addEventListener('click', likeCard);

  cardImgEl.addEventListener('click', () => {
    openImagePopup(value.link, value.name);
  });

  return newCard;
};

//Функци отрисовки карточки
const renderCard = (item, container, likeCard, deleteCard, openPopupImage, place) => {
  const newCard = createCard(item, likeCard, deleteCard, openPopupImage);
  if (place === 'end') {
    container.append(newCard);
  } else {
    container.prepend(newCard);
  }
};

const deleteCard = (event) => {
  event.target.closest('.card').remove();
};

const likeCard = (event) => {
  event.target.classList.toggle('card__like-button_active');
};

export { renderCard, deleteCard, likeCard };

