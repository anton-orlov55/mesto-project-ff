export function openModal(modal) {
  modal.classList.add('popup_is-opened');
  document.addEventListener('keydown', handleEscClose);
}

export function closeModal(modal) {
  modal.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', handleEscClose);
}

function handleEscClose(evt) {
  if (evt.key === 'Escape') {
    const openedModal = document.querySelector('.popup_is-opened');
    if (openedModal) {
      closeModal(openedModal);
    }
  }
}

export function setupModalCloseListeners() {
  document.querySelectorAll('.popup').forEach(modal => {
    modal.addEventListener('mousedown', (evt) => {
      if (evt.target === modal || evt.target.classList.contains('popup__close')) {
        closeModal(modal);
      }
    });
  });
}