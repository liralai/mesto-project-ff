import { addLike, removeLike } from "./api.js";

const cardTemplate = document.querySelector('#card-template').content;
const cardEl = cardTemplate.querySelector('.card');

const createCard = (value, likeCard, deleteCard, openImagePopup, userId) => {
  const newCard = cardEl.cloneNode(true); //Клонирование содержимого template
  const cardImgEl = newCard.querySelector('.card__image');
  const titleEl = newCard.querySelector('.card__title');
  const deleteButton = newCard.querySelector('.card__delete-button');
  const likeButton = newCard.querySelector('.card__like-button');
  const likeCounter = newCard.querySelector(".card__like-button-counter");

  titleEl.textContent = value.name;
  cardImgEl.src = value.link;
  cardImgEl.alt = value.name;
  likeCounter.textContent = value.likes.length;
  newCard.dataset.cardId = value._id;
  newCard.dataset.ownerId = value.owner._id;

  const isLiked = value.likes.some((like) => like._id === userId);

  if (isLiked) {
    likeButton.classList.add('card__like-button_active');
  }

  if (value.owner._id === userId) {
    deleteButton.addEventListener('click', (event) => {deleteCard(event, value._id);
    });
  } else {
    deleteButton.remove();
  };

  likeButton.addEventListener('click', (event) => {likeCard(event, value._id)});

  cardImgEl.addEventListener('click', () => {
    openImagePopup(value.link, value.name);
  });

  return newCard;
};

//Функци отрисовки карточки
const renderCard = (item, container, likeCard, deleteCard, openPopupImage, place, userId) => {
  const newCard = createCard(item, likeCard, deleteCard, openPopupImage, userId);
  if (place === 'end') {
    container.append(newCard);
  } else {
    container.prepend(newCard);
  }
};

const likeCard = async (event, cardId) => {
  const likesCounter = event.target.parentNode.querySelector('.card__like-button-counter');

  const likeMethod = event.target.classList.contains('card__like-button_active') ? removeLike : addLike;
  likeMethod(cardId)
    .then((counter) => {
      event.target.classList.toggle('card__like-button_active');
      likesCounter.textContent = counter.likes.length;
    })
    .catch((err) => {
      console.log(err);
    });
};

export { renderCard, likeCard };

