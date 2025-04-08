export class Card {
  constructor(data, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
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
    elementImage.addEventListener("click", this._handleOpenImagePopUp);
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

  _handleOpenImagePopUp(evt) {
    const cardElement = evt.target.closest(".element");
    const link = cardElement.querySelector(".element__image").src;
    const name = cardElement.querySelector(".element__title").textContent;

    function openImagePopUp(link, name) {
      const popupImage = document.querySelector(".popup__image");
      const popUpViewElement = document.querySelector("#popup-element");

      popupImage.src = link;
      popUpViewElement.querySelector(".popup-element__title").textContent =
        name;

      popUpViewElement.classList.add("popup_opened");
    }

    openImagePopUp(link, name);
  }

  generateCard() {
    const cardElement = this._getTemplate();
    const elementImage = cardElement.querySelector(".element__image");
    const elementName = cardElement.querySelector(".element__title");

    elementImage.src = this._link;
    elementName.textContent = this._name;

    this._setEventListeners(cardElement);

    return cardElement;
  }
}
