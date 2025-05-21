import { FormValidator } from "./FormValidator.js";
import { Card } from "./Card.js";
import { Section } from "./Section.js";
import { PopupWithImage } from "./PopupWithImage.js";
import { PopupWithForm } from "./PopupWithForm.js";
import { UserInfo } from "./UserInfo.js";

const validationSettings = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__submit",
  inactiveButtonClass: "form__button_disabled",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__error_visible",
};

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

const imagePopup = new PopupWithImage("#popup-element");
imagePopup.setEventListeners();

const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__subtitle",
});

const profilePopup = new PopupWithForm("#popup-profile", (formData) => {
  userInfo.setUserInfo({
    name: formData["input-name"],
    job: formData["input-about"],
  });
  profilePopup.close();
});
profilePopup.setEventListeners();

const newCardPopup = new PopupWithForm("#popup-elements", (formData) => {
  const newCard = {
    name: formData["place-name"],
    link: formData["place-url"],
  };

  const cardElement = createCard(newCard);
  cardSection.addItem(cardElement);
  newCardPopup.close();
});
newCardPopup.setEventListeners();

function createCard(cardData) {
  const card = new Card(cardData, "#element-template", (link, name) => {
    imagePopup.open(link, name);
  });
  return card.generateCard();
}

const cardSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const cardElement = createCard(item);
      cardSection.addItem(cardElement);
    },
  },
  ".elements"
);

cardSection.renderItems();

const profileFormValidator = new FormValidator(
  validationSettings,
  document.querySelector("#form-profile")
);
profileFormValidator.enableValidation();

const elementsFormValidator = new FormValidator(
  validationSettings,
  document.querySelector("#form-elements")
);
elementsFormValidator.enableValidation();

const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");

editButton.addEventListener("click", () => {
  const currentUserInfo = userInfo.getUserInfo();
  document.querySelector("#input-name").value = currentUserInfo.name;
  document.querySelector("#input-about").value = currentUserInfo.job;
  profilePopup.open();
});

addButton.addEventListener("click", () => {
  newCardPopup.open();
});
