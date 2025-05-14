
// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу


// Файл: scripts/index.js

// DOM узлы


import avatar from '../images/avatar.jpg';

document.querySelector('.profile__image').style.backgroundImage = `url(${avatar})`;

import '../pages/index.css';
import { initialCards } from './cards.js';
import { createCard, handleLike } from '../components/card.js';
import { openModal, closeModal, setupModalCloseListeners } from '../components/modal.js';


const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const placesList = document.querySelector('.places__list');


const editProfilePopup = document.querySelector('.popup_type_edit');
const addCardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');


const editProfileForm = document.forms['edit-profile'];
const addCardForm = document.forms['new-place'];


setupModalCloseListeners();


profileEditButton.addEventListener('click', () => {
  editProfileForm.elements.name.value = profileTitle.textContent;
  editProfileForm.elements.description.value = profileDescription.textContent;
  openModal(editProfilePopup);
});

profileAddButton.addEventListener('click', () => {
  addCardForm.reset();
  openModal(addCardPopup);
});


function deleteCard(cardElement) {
  cardElement.remove();
}


function openImagePopup(cardData) {
  const popupImage = imagePopup.querySelector('.popup__image');
  const popupCaption = imagePopup.querySelector('.popup__caption');
  
  popupImage.src = cardData.link;
  popupImage.alt = cardData.name;
  popupCaption.textContent = cardData.name;
  
  openModal(imagePopup);
}


function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = editProfileForm.elements.name.value;
  profileDescription.textContent = editProfileForm.elements.description.value;
  closeModal(editProfilePopup);
}


function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  
  const newCard = {
    name: addCardForm.elements['place-name'].value,
    link: addCardForm.elements.link.value
  };
  
  const cardElement = createCard(
    newCard,
    deleteCard,
    handleLike,
    openImagePopup
  );
  
  placesList.prepend(cardElement);
  closeModal(addCardPopup);
}


editProfileForm.addEventListener('submit', handleProfileFormSubmit);
addCardForm.addEventListener('submit', handleAddCardFormSubmit);


initialCards.forEach(cardData => {
  const cardElement = createCard(
    cardData,
    deleteCard,
    handleLike,
    openImagePopup
  );
  placesList.append(cardElement);
});