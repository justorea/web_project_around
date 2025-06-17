export default class FormValidator {
  constructor(settings, formElement) {
    this._settings = settings;
    this._formElement = formElement;
    this._inputList = Array.from(
      formElement.querySelectorAll(settings.inputSelector)
    );
    this._submitButton = formElement.querySelector(
      settings.submitButtonSelector
    );
  }

  _checkInputValidity(input) {
    if (input.validity.valid) {
      this._hideInputError(input);
    } else {
      this._showInputError(input);
    }
  }

  _showInputError(input) {
    const errorElement = document.querySelector(`#${input.name}-error`);
    errorElement.textContent = input.validationMessage;
    input.classList.add(this._settings.inputErrorClass);
  }

  _hideInputError(input) {
    const errorElement = document.querySelector(`#${input.name}-error`);
    errorElement.textContent = "";
    input.classList.remove(this._settings.inputErrorClass);
  }

  _hasInvalidInput() {
    return this._inputList.some((input) => !input.validity.valid);
  }

  _toggleSubmitButton() {
    if (this._hasInvalidInput()) {
      this._submitButton.classList.add(this._settings.inactiveButtonClass);
    } else {
      this._submitButton.classList.remove(this._settings.inactiveButtonClass);
    }
  }

  _setEventListeners() {
    this._inputList.forEach((input) => {
      input.addEventListener("input", () => {
        this._checkInputValidity(input);
        this._toggleSubmitButton();
      });
    });
  }

  enableValidation() {
    this._setEventListeners();
    this._formElement.addEventListener("submit", (evt) => evt.preventDefault());
  }
}
