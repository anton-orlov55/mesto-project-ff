// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу


// Файл: scripts/index.js

// DOM узлы


const placesList = document.querySelector('.places__list');


function createCard(cardData, deleteCallback) {
 
  const cardTemplate = document.querySelector('#card-template').content.querySelector('.card');
 
  const cardElement = cardTemplate.cloneNode(true);
 
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');
  
  
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;
  

  deleteButton.addEventListener('click', () => {
    deleteCallback(cardElement);
  });
  
  return cardElement;
}

function deleteCard(cardElement) {
  cardElement.remove();
}

initialCards.forEach((cardData) => {
  const cardElement = createCard(cardData, deleteCard);
  placesList.append(cardElement);
});