export class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".element")
      .cloneNode(true);
    return cardElement;
  }

  _setEventListeners(cardElement) {
    const likeButton = cardElement.querySelector(".element__like-empty");
    const trashButton = cardElement.querySelector(".element__trash");
    const elementImage = cardElement.querySelector(".element__image");

    likeButton.addEventListener("click", this._handleLikeButton);
    trashButton.addEventListener("click", this._handleTrashButton(cardElement));
    elementImage.addEventListener("click", () => {
      this._handleCardClick(this._link, this._name);
    });
  }

  _handleLikeButton(evt) {
    const likeButton = evt.target;
    likeButton.classList.toggle("element__like-empty");
    likeButton.classList.toggle("element__like-full");
  }

  _handleTrashButton(cardElement) {
    return () => {
      cardElement.remove();
    };
  }

  generateCard() {
    const cardElement = this._getTemplate();
    const elementImage = cardElement.querySelector(".element__image");
    const elementName = cardElement.querySelector(".element__title");

    elementImage.src = this._link;
    elementImage.alt = this._name;
    elementName.textContent = this._name;

    this._setEventListeners(cardElement);
    return cardElement;
  }
}
