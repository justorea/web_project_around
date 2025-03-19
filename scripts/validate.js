// habilitar la validación llamando a enableValidation()
// pasar todas las configuraciones en la llamada

function enableValidation(settings) {
  const formElement = document.querySelector(settings.formSelector);
  const inputList = Array.from(
    formElement.querySelectorAll(settings.inputSelector)
  );

  inputList.forEach(function (input) {
    input.addEventListener("input", function () {
      const submitButton = formElement.querySelector(
        settings.submitButtonSelector
      );
      checkInputValidity(input, settings);

      if (hasInvalidInput(inputList)) {
        submitButton.classList.add(settings.inactiveButtonClass);
      } else {
        submitButton.classList.remove(settings.inactiveButtonClass);
      }
    });
  });

  formElement.addEventListener("submit", function (evt) {
    evt.preventDefault();
  });
}

function checkInputValidity(input, settings) {
  if (input.validity.valid) {
    hideInputError(input, settings);
  } else {
    showInputError(input, settings);
  }
}

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

function showInputError(input, settings) {
  const errorElement = document.querySelector(`#${input.name}-error`);
  errorElement.textContent = input.validationMessage;
  input.classList.add(settings.inputErrorClass);
}

function hideInputError(input, settings) {
  const errorElement = document.querySelector(`#${input.name}-error`);
  errorElement.textContent = "";
  input.classList.remove(settings.inputErrorClass);
}

enableValidation({
  formSelector: "#form-profile",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__submit",
  inactiveButtonClass: "form__button_disabled",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__error_visible",
});

enableValidation({
  formSelector: "#form-elements",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__submit",
  inactiveButtonClass: "form__button_disabled",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__error_visible",
});
