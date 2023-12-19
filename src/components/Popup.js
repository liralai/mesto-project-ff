export class Popup {
  constructor(popupSelector) {
      this._popup = document.querySelector(popupSelector);
      this._handleEscClose = this._handleEscClose.bind(this);
  };


  //Функция добавления модификатора попапа
  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown',this._handleEscClose);
  }

  //Функция удаления модификатора попапа
  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown',this._handleEscClose);
  }

  //Закрытие попапа редактирование профиля без сохранения на Escape
  _handleEscClose(event) {
    if (event.key === 'Escape') {
      this.close();
    };
  }

//Закрытие попапа редактирование профиля без сохранения на область вне попапа
  setEventListeners() {
    this._popup.addEventListener('mousedown', event => {
      if (event.target.classList.contains('popup_opened')) {
        this.close();
      }
      if (event.target.classList.contains('popup__close-button')) {
        this.close();
      }
    })
  }
}
