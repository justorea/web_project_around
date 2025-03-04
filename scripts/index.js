const editButton = document.querySelector(".profile__edit-button");
const popUpProfile = document.querySelector("#popup-profile");
const formInputName = document.querySelector(".form__input-name");
const profileTitle = document.querySelector(".profile__title");
const formEditProfile = document.querySelector("#form-profile");
const profileSubtitle = document.querySelector(".profile__subtitle");
const popUpProfileCloseButton = document.querySelector(".popup__close");
const formInputAbout = document.querySelector(".form__input-about");
const elementTemplate = document.querySelector("#element-template");
const elementsContainer = document.querySelector(".elements");
const popUpCreateElement = document.querySelector("#popup-elements");
const createCardElementButton = document.querySelector(".profile__add-button");
const popUpElementsCloseButton = document.querySelector("#close-elements");
const inputNamePlace = document.querySelector("#place-name");
const inputUrlPlace = document.querySelector("#place-url");
const formCreateElements = document.querySelector("#form-elements");
const popUpViewElement = document.querySelector("#popup-element");
const popupImage = document.querySelector(".popup__image");
const closepopUpViewElementButton = document.querySelector("#close-element");
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

function handleOpenPopUp() {
  popUpProfile.classList.add("popup_opened");
}

function handleLikeButton(evt) {
  const likeButton = evt.target;
  likeButton.classList.toggle("element__like-empty");
  likeButton.classList.toggle("element__like-full");
}

function openImagePopUp(link, name) {
  popupImage.src = link;
  popUpViewElement.querySelector(".popup-element__title").textContent = name;
  popUpViewElement.classList.add("popup_opened");
}

function closePopup() {
  popUpProfile.classList.remove("popup_opened");
  popUpCreateElement.classList.remove("popup_opened");
  popUpViewElement.classList.remove("popup_opened");
}

function handleChangeProfileName(evt) {
  evt.preventDefault();
  profileTitle.textContent = formInputName.value;
  profileSubtitle.textContent = formInputAbout.value;
  closePopup();
}

function createCard(name, link) {
  const elementCard = elementTemplate
    .cloneNode(true)
    .content.querySelector(".element");

  const likeButton = elementCard.querySelector(".element__like-empty");
  const elementImage = elementCard.querySelector(".element__image");
  const elementName = elementCard.querySelector(".element__title");
  const trashButton = elementCard.querySelector(".element__trash");
  editButton.addEventListener("click", handleOpenPopUp);
  likeButton.addEventListener("click", handleLikeButton);
  elementImage.src = link;
  elementName.textContent = name;
  trashButton.addEventListener("click", function () {
    elementCard.remove();
  });
  elementImage.addEventListener("click", function () {
    openImagePopUp(link, name);
  });
  elementsContainer.prepend(elementCard);
}

formEditProfile.addEventListener("submit", handleChangeProfileName);
popUpProfileCloseButton.addEventListener("click", function () {
  closePopup();
});
formEditProfile.addEventListener("submit", handleChangeProfileName);
createCardElementButton.addEventListener("click", function () {
  popUpCreateElement.classList.add("popup_opened");
});
popUpElementsCloseButton.addEventListener("click", function () {
  closePopup();
});
formCreateElements.addEventListener("submit", handleChangeProfileName);
createCardElementButton.addEventListener("click", function () {
  popUpCreateElement.classList.add("popup_opened");
});

formCreateElements.addEventListener("submit", function (evt) {
  evt.preventDefault();
  createCard(inputNamePlace.value, inputUrlPlace.value);
});

initialCards.forEach(function (card) {
  createCard(card.name, card.link);
});

closepopUpViewElementButton.addEventListener("click", closePopup);
