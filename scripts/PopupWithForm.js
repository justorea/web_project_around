import { Popup } from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitCallback) {
    super(popupSelector);
    this._submitCallback = submitCallback;
    this._form = this._popup.querySelector(".popup__form");
    this._inputs = this._form.querySelectorAll(".form__input");
    this._submitButton = this._form.querySelector(".form__submit");
    this._submitButtonText = this._submitButton.value;
  }

  _getInputValues() {
    const formValues = {};
    this._inputs.forEach((input) => {
      formValues[input.name] = input.value;
    });
    return formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submitCallback(this._getInputValues());
    });
  }

  renderLoading(isLoading, loadingText = "Guardando...") {
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
    this._form.reset();
    this.renderLoading(false);
  }
}
