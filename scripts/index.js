import FormValidator from "./FormValidator.js";
import Card from "./Card.js";
import Section from "./Section.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import PopupWithConfirmation from "./PopupWithConfirmation.js";
import UserInfo from "./UserInfo.js";
import api from "./Api.js";

const validationSettings = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__submit",
  inactiveButtonClass: "form__button_disabled",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__error_visible",
};

let userId;

const imagePopup = new PopupWithImage("#popup-element");
imagePopup.setEventListeners();

const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__subtitle",
  avatarSelector: ".profile__avatar",
});

const profilePopup = new PopupWithForm("#popup-profile", (data) => {
  profilePopup.renderLoading(true);

  api
    .updateUserProfile(data["input-name"], data["input-about"])
    .then((userData) => {
      userInfo.setUserInfo({
        name: userData.name,
        job: userData.about,
      });
      profilePopup.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      profilePopup.renderLoading(false);
    });
});
profilePopup.setEventListeners();

const newCardPopup = new PopupWithForm("#popup-elements", (data) => {
  newCardPopup.renderLoading(true, "Creando...");

  api
    .createCard(data["place-name"], data["place-url"])
    .then((cardData) => {
      const cardElement = createCard(cardData);
      cardList.addItem(cardElement);
      newCardPopup.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      newCardPopup.renderLoading(false);
    });
});
newCardPopup.setEventListeners();

const deleteCardPopup = new PopupWithConfirmation("#popup-delete", (cardId) => {
  deleteCardPopup.renderLoading(true, "Eliminando...");

  api
    .deleteCard(cardId)
    .then(() => {
      const cardElement = document.querySelector(`[data-id="${cardId}"]`);
      if (cardElement) {
        cardElement.remove();
      }
      deleteCardPopup.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      deleteCardPopup.renderLoading(false);
    });
});
deleteCardPopup.setEventListeners();

const avatarPopup = new PopupWithForm("#popup-avatar", (data) => {
  avatarPopup.renderLoading(true);

  api
    .updateUserAvatar(data["avatar-url"])
    .then((userData) => {
      userInfo.setUserInfo({
        name: userData.name,
        job: userData.about,
        avatar: userData.avatar,
      });
      avatarPopup.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      avatarPopup.renderLoading(false);
    });
});
avatarPopup.setEventListeners();

function createCard(data) {
  const card = new Card(
    data,
    "#element-template",
    (link, name) => {
      imagePopup.open(link, name);
    },
    (cardId) => {
      deleteCardPopup.open(cardId);
    },
    (cardId, isLiked) => {
      if (isLiked) {
        api
          .unlikeCard(cardId)
          .then((cardData) => {
            card.updateLikes(cardData.isLiked);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        api
          .likeCard(cardId)
          .then((cardData) => {
            card.updateLikes(cardData.isLiked);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    userId
  );
  return card.generateCard();
}

const cardList = new Section(
  {
    items: [],
    renderer: (data) => {
      cardList.addItem(createCard(data));
    },
  },
  ".elements"
);

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

const avatarFormValidator = new FormValidator(
  validationSettings,
  document.querySelector("#form-avatar")
);
avatarFormValidator.enableValidation();

const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const avatarElement = document.querySelector(".profile__avatar");

editButton.addEventListener("click", () => {
  const currentUserInfo = userInfo.getUserInfo();
  document.querySelector("#input-name").value = currentUserInfo.name;
  document.querySelector("#input-about").value = currentUserInfo.job;
  profilePopup.open();
});

addButton.addEventListener("click", () => {
  newCardPopup.open();
});

avatarElement.addEventListener("click", () => {
  avatarPopup.open();
});

api
  .getAppInfo()
  .then(([userData, cardsData]) => {
    userId = userData._id;

    userInfo.setUserInfo({
      name: userData.name,
      job: userData.about,
      avatar: userData.avatar,
    });

    cardList._items = cardsData;
    cardList.renderItems();
  })
  .catch((err) => {
    console.log(err);
  });
