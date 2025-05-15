
const handleEscClose = (evt, closeModal) => {
  if (evt.key === 'Escape') closeModal();
};


export const openModal = (modalElement) => {
  modalElement.classList.add('popup_is-opened');
  

  const escHandler = (evt) => handleEscClose(evt, () => closeModal(modalElement));
  document.addEventListener('keydown', escHandler);
  

  return () => document.removeEventListener('keydown', escHandler);
};


export const closeModal = (modalElement) => {
  modalElement.classList.remove('popup_is-opened');
};


export const setupModalCloseListeners = (modalElements) => {
  const cleanups = [];
  
  modalElements.forEach(modalElement => {
    const clickHandler = (evt) => {
      if (evt.target === modalElement || evt.target.closest('.popup__close')) {
        closeModal(modalElement);
      }
    };
    
    modalElement.addEventListener('mousedown', clickHandler);
    cleanups.push(() => {
      modalElement.removeEventListener('mousedown', clickHandler);
    });
  });
  
  return () => cleanups.forEach(cleanup => cleanup());
};