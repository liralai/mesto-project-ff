//Закрытие попапа редактирование профиля без сохранения на Escape
function closePopupOnEsc (event) {
  if (event.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  };
};

//Закрытие попапа редактирование профиля без сохранения на область вне попапа
function closePopupOnOverlay (event) {
  const popupOpened = document.querySelector('.popup_opened');

  if (event.target === popupOpened) {
    closePopup(popupOpened);
  };
};

//Функция добавления модификатора попапа
function openPopup(popupElement) {
  popupElement.classList.add('popup_opened');
  document.addEventListener('keydown',closePopupOnEsc);
  document.addEventListener('click', closePopupOnOverlay);
};

//Функция удаления модификатора попапа
function closePopup(popupElement) {
  popupElement.classList.remove('popup_opened');
  document.removeEventListener('keydown',closePopupOnEsc);
  document.removeEventListener('click', closePopupOnOverlay);
};

export { closePopup, openPopup };
