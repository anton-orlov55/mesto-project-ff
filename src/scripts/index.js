import avatar from '../images/avatar.jpg';
import logo from '../images/logo.svg';
import '../pages/index.css';
import { createCard, handleLike } from '../components/card.js';
import { openModal, closeModal, setupModalCloseListeners } from '../components/modal.js';
import { enableValidation, clearValidation, validationConfig } from '../components/validation.js';
import { getUserInfo, getInitialCards, updateUserInfo, addNewCard, deleteCard as apiDeleteCard, likeCard, unlikeCard, updateAvatar } from '../components/api.js';

let currentUserId = null;

const logoElement = document.querySelector('.header__logo');
if (logoElement) logoElement.src = logo;

Promise.all([getUserInfo(), getInitialCards()])
  .then(([userData, cardsData]) => {
    currentUserId = userData._id;
    renderUserInfo(userData);
    renderInitialCards(cardsData, currentUserId);
  })
  .catch(err => console.log(err));

enableValidation(validationConfig);

const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const avatarEditButton = document.querySelector('.profile__image');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const placesList = document.querySelector('.places__list');

const modals = {
  editProfile: document.querySelector('.popup_type_edit'),
  addCard: document.querySelector('.popup_type_new-card'),
  avatar: document.querySelector('.popup_type_avatar'),
  imageView: document.querySelector('.popup_type_image')
};

const editProfileForm = document.forms['edit-profile'];
const addCardForm = document.forms['new-place'];
const avatarForm = document.forms['avatar-form'];

setupModalCloseListeners(Object.values(modals));

function renderUserInfo(userData) {
  profileTitle.textContent = userData.name;
  profileDescription.textContent = userData.about;
  document.querySelector('.profile__image').style.backgroundImage = `url(${userData.avatar})`;
}

function renderInitialCards(cardsData, userId) {
  cardsData.forEach(cardData => {
    const cardElement = createCard(cardData, handleCardDelete, (likeButton, cardId, likeCount) => handleCardLike(likeButton, cardId, likeCount), openImagePopup, userId);
    placesList.append(cardElement);
  });
}

function handleCardDelete(cardElement, cardId) {
  apiDeleteCard(cardId)
    .then(() => cardElement.remove())
    .catch(err => console.log(err));
}

function handleCardLike(likeButton, cardId, likeCount) {
  handleLike(likeButton, cardId, likeCount, likeCard, unlikeCard);
}

function openImagePopup(cardData) {
  const popupImage = modals.imageView.querySelector('.popup__image');
  const popupCaption = modals.imageView.querySelector('.popup__caption');
  popupImage.src = cardData.link;
  popupImage.alt = cardData.name;
  popupCaption.textContent = cardData.name;
  openModal(modals.imageView);
}

profileEditButton.addEventListener('click', () => {
  if (editProfileForm.elements.name) editProfileForm.elements.name.value = profileTitle.textContent;
  if (editProfileForm.elements.about) editProfileForm.elements.about.value = profileDescription.textContent;
  clearValidation(editProfileForm, validationConfig);
  openModal(modals.editProfile);
});

profileAddButton.addEventListener('click', () => {
  addCardForm.reset();
  clearValidation(addCardForm, validationConfig);
  openModal(modals.addCard);
});

avatarEditButton.addEventListener('click', () => {
  avatarForm.reset();
  clearValidation(avatarForm, validationConfig);
  openModal(modals.avatar);
});

editProfileForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const submitButton = editProfileForm.querySelector('.popup__button');
  const originalText = submitButton.textContent;
  submitButton.textContent = 'Сохранение...';
  updateUserInfo(editProfileForm.elements.name.value, editProfileForm.elements.about.value)
    .then(userData => {
      renderUserInfo(userData);
      closeModal(modals.editProfile);
    })
    .catch(err => console.log(err))
    .finally(() => submitButton.textContent = originalText);
});

addCardForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const submitButton = addCardForm.querySelector('.popup__button');
  const originalText = submitButton.textContent;
  submitButton.textContent = 'Сохранение...';
  addNewCard(addCardForm.elements.name.value, addCardForm.elements.link.value)
    .then(cardData => {
      const cardElement = createCard(cardData, handleCardDelete, (likeButton, cardId, likeCount) => handleCardLike(likeButton, cardId, likeCount), openImagePopup, currentUserId);
      placesList.prepend(cardElement);
      addCardForm.reset();
      closeModal(modals.addCard);
    })
    .catch(err => console.log(err))
    .finally(() => submitButton.textContent = originalText);
});

avatarForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const submitButton = avatarForm.querySelector('.popup__button');
  const originalText = submitButton.textContent;
  submitButton.textContent = 'Сохранение...';
  updateAvatar(avatarForm.elements.avatar.value)
    .then(userData => {
      document.querySelector('.profile__image').style.backgroundImage = `url(${userData.avatar})`;
      closeModal(modals.avatar);
    })
    .catch(err => console.log(err))
    .finally(() => submitButton.textContent = originalText);
});