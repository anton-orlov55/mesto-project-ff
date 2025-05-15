// Функция закрытия по Esc
const handleEscClose = (evt, closeModal) => {
  if (evt.key === 'Escape') closeModal();
};

// Открытие модального окна
export const openModal = (modalElement) => {
  modalElement.classList.add('popup_is-opened');
  
  // Добавляем обработчик Esc с привязанным контекстом
  const escHandler = (evt) => handleEscClose(evt, () => closeModal(modalElement));
  document.addEventListener('keydown', escHandler);
  
  // Возвращаем функцию для очистки
  return () => document.removeEventListener('keydown', escHandler);
};

// Закрытие модального окна
export const closeModal = (modalElement) => {
  modalElement.classList.remove('popup_is-opened');
};

// Инициализация закрытия по клику
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