let editButton = document.querySelector(".profile__edit-button");
let popUp = document.querySelector(".popup__container");
let formInputName = document.querySelector(".form__input-name");
let profileTitle = document.querySelector(".profile__title");
let formEditButton = document.querySelector(".form");
let profileSubtitle = document.querySelector(".profile__subtitle");
let popUpCloseButton = document.querySelector(".popup__close");
let formInputAbout = document.querySelector(".form__input-about");

function handleOpenPopUp() {
  popUp.classList.add("popup_opened");
}

editButton.addEventListener("click", handleOpenPopUp);

function closePopup() {
  popUp.classList.remove("popup_opened");
}

function handleChangeProfileName(evt) {
  evt.preventDefault();
  profileTitle.textContent = formInputName.value;
  profileSubtitle.textContent = formInputAbout.value;
  closePopup();
}

formEditButton.addEventListener("submit", handleChangeProfileName);
popUpCloseButton.addEventListener("click", function () {
  closePopup();
});
