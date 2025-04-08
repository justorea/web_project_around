export function openPopup(popup) {
  popup.classList.add("popup_opened");
}

export function closePopup() {
  const popUpProfile = document.querySelector("#popup-profile");
  const popUpCreateElement = document.querySelector("#popup-elements");
  const popUpViewElement = document.querySelector("#popup-element");

  popUpProfile.classList.remove("popup_opened");
  popUpCreateElement.classList.remove("popup_opened");
  popUpViewElement.classList.remove("popup_opened");
}

export function closePopupIfClickedOutside(evt) {
  if (evt.target === evt.currentTarget) {
    closePopup();
  }
}

export function setPopupEvents() {
  const editButton = document.querySelector(".profile__edit-button");
  const popUpProfile = document.querySelector("#popup-profile");
  const popUpCreateElement = document.querySelector("#popup-elements");

  editButton.addEventListener("click", () => openPopup(popUpProfile));

  document
    .querySelector("#close-button-profile")
    .addEventListener("click", closePopup);

  document
    .querySelector(".profile__add-button")
    .addEventListener("click", () => {
      openPopup(popUpCreateElement);
    });

  document
    .querySelector("#close-elements")
    .addEventListener("click", closePopup);
  document
    .querySelector("#close-element")
    .addEventListener("click", closePopup);

  document.addEventListener("keydown", (evt) => {
    if (evt.key === "Escape") closePopup();
  });

  document
    .querySelector("#popup-profile")
    .addEventListener("click", closePopupIfClickedOutside);
  document
    .querySelector("#popup-elements")
    .addEventListener("click", closePopupIfClickedOutside);
  document
    .querySelector("#popup-element")
    .addEventListener("click", closePopupIfClickedOutside);
}
