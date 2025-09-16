export function createCard(cardData, deleteCallback, likeCallback, imageClickCallback, userId) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');
  const likeCount = cardElement.querySelector('.card__like-count');

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;
  
  if (likeCount) {
    likeCount.textContent = cardData.likes.length;
  }

  if (deleteButton && cardData.owner._id !== userId) {
    deleteButton.style.display = 'none';
  }

  if (likeButton && cardData.likes.some(like => like._id === userId)) {
    likeButton.classList.add('card__like-button_is-active');
  }

  if (deleteButton) {
    deleteButton.addEventListener('click', () => deleteCallback(cardElement, cardData._id));
  }
  
  if (likeButton) {
    likeButton.addEventListener('click', () => likeCallback(likeButton, cardData._id, likeCount));
  }
  
  cardImage.addEventListener('click', () => imageClickCallback(cardData));

  return cardElement;
}

export function handleLike(likeButton, cardId, likeCount, likeCallback, unlikeCallback) {
  const isLiked = likeButton.classList.contains('card__like-button_is-active');
  
  if (isLiked) {
    unlikeCallback(cardId)
      .then(updatedCard => {
        likeButton.classList.remove('card__like-button_is-active');
        if (likeCount) {
          likeCount.textContent = updatedCard.likes.length;
        }
      })
      .catch(err => console.log(err));
  } else {
    likeCallback(cardId)
      .then(updatedCard => {
        likeButton.classList.add('card__like-button_is-active');
        if (likeCount) {
          likeCount.textContent = updatedCard.likes.length;
        }
      })
      .catch(err => console.log(err));
  }
}