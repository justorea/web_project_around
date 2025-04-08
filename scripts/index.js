import { Card } from "./card.js";
import { FormValidator } from "./FormValidator.js";
import {
  closePopup,
  closePopupIfClickedOutside,
  setPopupEvents,
} from "./utils.js";

const formEditProfile = document.querySelector("#form-profile");

const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lake-louise.jpg",
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/latemar.jpg",
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lago.jpg",
  },
];

const profileFormValidator = new FormValidator(
  {
    formSelector: "#form-profile",
    inputSelector: ".form__input",
    submitButtonSelector: ".form__submit",
    inactiveButtonClass: "form__button_disabled",
    inputErrorClass: "form__input_type_error",
    errorClass: "form__error_visible",
  },
  document.querySelector("#form-profile")
);

profileFormValidator.enableValidation();
formEditProfile.addEventListener("submit", handleChangeProfileName);

const elementsFormValidator = new FormValidator(
  {
    formSelector: "#form-elements",
    inputSelector: ".form__input",
    submitButtonSelector: ".form__submit",
    inactiveButtonClass: "form__button_disabled",
    inputErrorClass: "form__input_type_error",
    errorClass: "form__error_visible",
  },
  document.querySelector("#form-elements")
);

elementsFormValidator.enableValidation();

function handleChangeProfileName(evt) {
  evt.preventDefault();

  const formInputName = document.querySelector("#input-name");
  const formInputAbout = document.querySelector("#input-about");

  const profileTitle = document.querySelector(".profile__title");
  const profileSubtitle = document.querySelector(".profile__subtitle");

  profileTitle.textContent = formInputName.value;
  profileSubtitle.textContent = formInputAbout.value;
  closePopup();
}

const elementsContainer = document.querySelector(".elements");
initialCards.forEach((cardData) => {
  const card = new Card(cardData, "#element-template");
  elementsContainer.prepend(card.generateCard());
});

const formCreateElement = document.querySelector("#form-elements");

formCreateElement.addEventListener("submit", handleCreateNewElement);

function handleCreateNewElement(evt) {
  evt.preventDefault();

  const placeNameInput = document.querySelector("#place-name");
  const placeUrlInput = document.querySelector("#place-url");

  const newCardData = {
    name: placeNameInput.value,
    link: placeUrlInput.value,
  };

  const newCard = new Card(newCardData, "#element-template");
  elementsContainer.prepend(newCard.generateCard());
  placeNameInput.value = "";
  placeUrlInput.value = "";
  closePopup();
}

setPopupEvents();
