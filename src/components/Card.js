class Card {

  constructor({name, link}, templateSelector, handleCardClick) {
    this._title = name;
    this._link = link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  };

  _getTemplate() {
    const cardTemplate = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);

    return cardTemplate;
  }

  _setData() {
    const cardImgEl = this._newCard.querySelector('.card__image');
    cardImgEl.src = this._link;
    cardImgEl.alt = this._title;

    const titleEl = this._newCard.querySelector('.card__title');
    titleEl.textContent = this._title;
  }

  _handleDeleteCard() {
    this._newCard.remove();
    this._newCard = null;
  }

  _handleLikeCard() {
    this._likeButton.classList.toggle('card__like-button_active');
  }

  _setListeners() {
    this._deleteButton.addEventListener('click', () => this._handleDeleteCard());

    //Кнопка Like становится активной по клику, при повторном клике активное состояние убирается
    this._likeButton.addEventListener('click', () => this._handleLikeCard());

    this._openImageButton.addEventListener('click', () => this._handleCardClick(this._title, this._link));
  }

  getView() {
    this._newCard = this._getTemplate();

    this._deleteButton = this._newCard.querySelector('.card__delete-button');
    this._likeButton = this._newCard.querySelector('.card__like-button');
    this._openImageButton = this._newCard.querySelector('.card__open-image-button');

    this._setData();
    this._setListeners();

    return this._newCard;
  }
}

export default Card;
