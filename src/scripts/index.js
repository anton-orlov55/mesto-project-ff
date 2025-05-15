
// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу


// Файл: scripts/index.js

// DOM узлы


// scripts/index.js

import avatar from '../images/avatar.jpg';
import '../pages/index.css';
import { initialCards } from './cards.js';
import { createCard, deleteCard, handleLike } from '../components/card.js';
import { openModal, closeModal, setupModalCloseListeners } from '../components/modal.js';


document.querySelector('.profile__image').style.backgroundImage = `url(${avatar})`;


const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const placesList = document.querySelector('.places__list');


const modals = {
  editProfile: document.querySelector('.popup_type_edit'),
  addCard: document.querySelector('.popup_type_new-card'),
  imageView: document.querySelector('.popup_type_image')
};


const editProfileForm = document.forms['edit-profile'];
const addCardForm = document.forms['new-place'];


const cleanupModalListeners = setupModalCloseListeners(Object.values(modals));


function openImagePopup(cardData) {
  const popupImage = modals.imageView.querySelector('.popup__image');
  const popupCaption = modals.imageView.querySelector('.popup__caption');
  
  popupImage.src = cardData.link;
  popupImage.alt = cardData.name;
  popupCaption.textContent = cardData.name;
  
  openModal(modals.imageView);
}


profileEditButton.addEventListener('click', () => {
  editProfileForm.elements.name.value = profileTitle.textContent;
  editProfileForm.elements.description.value = profileDescription.textContent;
  openModal(modals.editProfile);
});

profileAddButton.addEventListener('click', () => {
  addCardForm.reset();
  openModal(modals.addCard);
});


editProfileForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  profileTitle.textContent = editProfileForm.elements.name.value;
  profileDescription.textContent = editProfileForm.elements.description.value;
  closeModal(modals.editProfile);
});

addCardForm.addEventListener('submit', (evt) => {
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
  addCardForm.reset();
  closeModal(modals.addCard);
});


initialCards.forEach(cardData => {
  const cardElement = createCard(
    cardData,
    deleteCard,
    handleLike,
    openImagePopup
  );
  placesList.append(cardElement);
});