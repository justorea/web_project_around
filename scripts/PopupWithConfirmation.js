import { Popup } from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, submitCallback) {
    super(popupSelector);
    this._submitCallback = submitCallback;
    this._form = this._popup.querySelector(".popup__form");
    this._submitButton = this._form.querySelector(".form__submit");
    this._submitButtonText = this._submitButton.value;
    this._cardId = null;
  }

  open(cardId) {
    this._cardId = cardId;
    super.open();
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submitCallback(this._cardId);
    });
  }

  renderLoading(isLoading, loadingText = "Eliminando...") {
    if (isLoading) {
      this._submitButton.value = loadingText;
      this._submitButton.disabled = true;
    } else {
      this._submitButton.value = this._submitButtonText;
      this._submitButton.disabled = false;
    }
  }

  close() {
    super.close();
    this.renderLoading(false);
  }
}
