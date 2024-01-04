import "./index.css";
import { closePopup, openPopup } from "../scripts/modal.js";
import { renderCard, likeCard, deleteCard } from "../scripts/card.js";
import { enableValidation, clearValidation } from "../scripts/validation.js";
import { getBaseInfo, editUserData, deleteCardApi, addNewCard, updateAvatar } from "../scripts/api.js";

const profileEditButtonEl = document.querySelector('.profile__edit-button');
const popupProfileEl = document.querySelector('#popup-profile');
const nameProfileInputEl = document.querySelector('#name-profile-input');
const infoProfileInputEl = document.querySelector('#info-profile-input');
const profileNameEl = document.querySelector('.profile__name');
const profileTitleEl = document.querySelector('.profile__title');
const profileAvatarEl = document.querySelector('.profile__avatar-image');
const formProfileEl = document.forms["profile-form"];
const imageEl = document.querySelector('.popup-image__image');
const imageTitleEl = document.querySelector('.popup-image__title');
const cardsSection = document.querySelector('.elements');
const popupPlaceEl = document.querySelector('#popup-place');
const profileAddButtonEl = document.querySelector('.profile__add-button');
const formCardEl = document.forms["card-form"];
const popupImageEl = document.querySelector('#popup-image');
const closeButtons = document.querySelectorAll('.popup__close-button');
const profileFormSubmitButton = formProfileEl.querySelector('.popup__save-button');
const cardFormSubmitButton = formCardEl.querySelector('.popup__save-button');
const confirmPopup = document.querySelector('#popup-confirm');
const confirmButton = confirmPopup.querySelector('.popup__save-button');
const formAvatarEl = document.forms["avatar-form"];
const confirmAvatarButton = formAvatarEl.querySelector('.popup__save-button');
const editAvatarButtonEl = document.querySelector('.profile__avatar');
const avatarPopup = document.querySelector('#popup-avatar');

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  fieldsetSelector: '.popup__set',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

let userId;

const setLoading = (isLoading, button) => {
  button.textContent = isLoading ? "Сохранение..." : "Сохранить"
};

const setUserInfo = (userInfo) => {
  profileNameEl.textContent = userInfo.name;
  profileTitleEl.textContent = userInfo.about;
  profileAvatarEl.style.backgroundImage = `url(${userInfo.avatar})`;
};

const setUserInfoToPopup = (name, info) => {
  nameProfileInputEl.value = name;
  infoProfileInputEl.value = info;
};

const openImagePopup = (src, title) => {
  imageTitleEl.textContent = title;
  imageEl.src = src;
  imageEl.alt = title;
  openPopup(popupImageEl);
};

const renderInitialCards = (initialCards, userId) => {
  initialCards.forEach((item) => {
    renderCard(item, cardsSection, likeCard, deleteCard, openImagePopup, 'end', userId)
  });
}

getBaseInfo()
  .then((res) => {
    const userInfo = res[0];
    userId = userInfo._id;
    const initialCards = res[1];
    setUserInfo(userInfo);
    renderInitialCards(initialCards, userId);
  })
  .catch((err) => {
    console.log(err);
  });

const userFormSubmit = async (event) => {
  event.preventDefault();

  setLoading(true, profileFormSubmitButton);
  profileNameEl.textContent = formProfileEl.name.value;
  profileTitleEl.textContent = formProfileEl.title.value;
  closePopup(popupProfileEl);
  clearValidation(popupProfileEl, validationConfig);

  editUserData({
    name: formProfileEl.name.value,
    about: formProfileEl.title.value
  })
    .then((updatedProfile) => {
      setUserInfo(updatedProfile);
      closePopup(popupProfileEl);
      clearValidation(formProfileEl, validationConfig);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      setLoading(false, profileFormSubmitButton);
    });
};

const setNewCard = async (event) => {
  event.preventDefault();

  setLoading(true, cardFormSubmitButton);
  const name = formCardEl.elements.name.value;
  const link = formCardEl.elements.link.value;

  addNewCard({ name, link })
    .then((newCard) => {
      renderCard(newCard, cardsSection, likeCard, deleteCard, openImagePopup, 'start', userId);
      closePopup(popupPlaceEl);
      formCardEl.reset();
      clearValidation(formCardEl, validationConfig);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      setLoading(false, cardFormSubmitButton);
    });
};

const confirmDeletePopup = async () => {

  deleteCardApi(confirmPopup.dataset.cardId)
    .then((res) => {
      const card = document.querySelector(`[data-card-id="${confirmPopup.dataset.cardId}"]`);
      card.remove();
      closePopup(confirmPopup);
    })
    .catch((err) => {
      console.log(err);
    });
};

const changeAvatar = async (event) => {
  event.preventDefault();

  setLoading(true, confirmAvatarButton);
  updateAvatar(formAvatarEl.link.value)
    .then((updatedProfile) => {
      setUserInfo(updatedProfile);
      closePopup(avatarPopup);
      clearValidation(formAvatarEl, validationConfig);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      setLoading(false, confirmAvatarButton);
    });
};

//Открытие попапа редактирования профиля по клику на кнопку редактирования
profileEditButtonEl.addEventListener('click', function() {
  clearValidation(formProfileEl, validationConfig);
  setUserInfoToPopup(
    profileNameEl.textContent,
    profileTitleEl.textContent
  );
  openPopup(popupProfileEl);
});

//Открытие попапа добавления карточки по клику на кнопку редактирования
profileAddButtonEl.addEventListener('click', function() {
  formCardEl.reset();
  clearValidation(formCardEl, validationConfig);
  openPopup(popupPlaceEl);
});

editAvatarButtonEl.addEventListener('click', function() {
  clearValidation(formAvatarEl, validationConfig);
  formAvatarEl.reset();
  openPopup(avatarPopup);
});

//Функция закрытия попапа по клику на крестик
closeButtons.forEach((button) => {
  const closeButton = button.closest('.popup');
  button.addEventListener('click', () => closePopup(closeButton));
});

formProfileEl.addEventListener('submit', userFormSubmit);

formCardEl.addEventListener('submit', setNewCard);

confirmButton.addEventListener('click', confirmDeletePopup);

formAvatarEl.addEventListener('submit', changeAvatar);

enableValidation(validationConfig);

export { openImagePopup };
