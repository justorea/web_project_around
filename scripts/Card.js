export default class Card {
  constructor(
    data,
    templateSelector,
    handleCardClick,
    handleDeleteClick,
    handleLikeClick,
    userId
  ) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._ownerId = data.owner;
    this._isLiked = data.isLiked;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
    this._userId = userId;
  }

  _cloneTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".element")
      .cloneNode(true);
    return cardElement;
  }

  _setEventListeners() {
    const likeButton = this._element.querySelector(".element__like-empty");
    const trashButton = this._element.querySelector(".element__trash");
    const elementImage = this._element.querySelector(".element__image");

    likeButton.addEventListener("click", () => {
      this._handleLikeClick(this._id, this._isLiked);
    });

    if (this._ownerId === this._userId) {
      trashButton.addEventListener("click", () => {
        this._handleDeleteClick(this._id);
      });
    } else {
      trashButton.style.display = "none";
    }

    elementImage.addEventListener("click", () => {
      this._handleCardClick(this._link, this._name);
    });
  }

  updateLikes(isLiked) {
    this._isLiked = isLiked;
    const likeButton = this._element.querySelector(
      ".element__like-empty, .element__like-full"
    );

    if (this._isLiked) {
      likeButton.classList.remove("element__like-empty");
      likeButton.classList.add("element__like-full");
    } else {
      likeButton.classList.remove("element__like-full");
      likeButton.classList.add("element__like-empty");
    }
  }

  getId() {
    return this._id;
  }

  removeCard() {
    this._element.remove();
    this._element = null;
  }

  generateCard() {
    this._element = this._cloneTemplate();
    const elementImage = this._element.querySelector(".element__image");
    const elementName = this._element.querySelector(".element__title");

    elementImage.src = this._link;
    elementImage.alt = this._name;
    elementName.textContent = this._name;

    this._element.setAttribute("data-id", this._id);

    this.updateLikes(this._isLiked);

    this._setEventListeners();
    return this._element;
  }
}
