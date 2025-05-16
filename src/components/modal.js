let openedPopup = null; 


const handleEscClose = (evt) => {
  if (evt.key === 'Escape' && openedPopup) {
    closeModal(openedPopup);
  }
};

export const openModal = (modalElement) => {
 
  if (openedPopup) {
    closeModal(openedPopup);
  }
  modalElement.classList.add('popup_is-opened');
  openedPopup = modalElement;
  document.addEventListener('keydown', handleEscClose);
};

export const closeModal = (modalElement) => {
  modalElement.classList.remove('popup_is-opened');
  if (openedPopup === modalElement) {
    openedPopup = null;
    document.removeEventListener('keydown', handleEscClose);
  }
};

export const setupModalCloseListeners = (modalElements) => {
  modalElements.forEach(modalElement => {
    modalElement.addEventListener('mousedown', (evt) => {
      if (evt.target === modalElement || evt.target.closest('.popup__close')) {
        closeModal(modalElement);
      }
    });
  });
};