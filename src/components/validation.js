export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

const errorMessages = {
  valueMissing: 'Вы пропустили это поле',
  typeMismatch: 'Введите адрес сайта',
  tooShort: 'Минимальная длина - {minLength} символа',
  tooLong: 'Максимальная длина - {maxLength} символов',
  patternMismatch: 'Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы'
};

const namePattern = /^[A-Za-zА-Яа-яЁё\s\-]+$/;

const showInputError = (formElement, inputElement, errorMessage, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  if (errorElement) {
    inputElement.classList.add(config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(config.errorClass);
  }
};

const hideInputError = (formElement, inputElement, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  if (errorElement) {
    inputElement.classList.remove(config.inputErrorClass);
    errorElement.classList.remove(config.errorClass);
    errorElement.textContent = '';
  }
};

const checkPatternValidity = (inputElement) => {
  if (inputElement.name === 'name' || inputElement.name === 'about') {
    return namePattern.test(inputElement.value);
  }
  return true;
};

const checkLengthValidity = (inputElement) => {
  if (inputElement.name === 'name') {
    return inputElement.value.length >= 2 && inputElement.value.length <= 40;
  }
  if (inputElement.name === 'about') {
    return inputElement.value.length >= 2 && inputElement.value.length <= 200;
  }
  return true;
};

const getCustomErrorMessage = (inputElement, validity) => {
   if (validity.valueMissing) {
    return errorMessages.valueMissing;
  }
  
   if (!checkPatternValidity(inputElement)) {
    return errorMessages.patternMismatch;
  }
  
  if (inputElement.name === 'name' && inputElement.value.length < 2) {
    return errorMessages.tooShort.replace('{minLength}', '2');
  }
  
  if (inputElement.name === 'name' && inputElement.value.length > 40) {
    return errorMessages.tooLong.replace('{maxLength}', '40');
  }
  
  if (inputElement.name === 'about' && inputElement.value.length < 2) {
    return errorMessages.tooShort.replace('{minLength}', '2');
  }
  
  if (inputElement.name === 'about' && inputElement.value.length > 200) {
    return errorMessages.tooLong.replace('{maxLength}', '200');
  }
  
  if (validity.typeMismatch && inputElement.type === 'url') {
    return errorMessages.typeMismatch;
  }
  
  return inputElement.validationMessage;
};

const checkInputValidity = (formElement, inputElement, config) => {
  const isPatternValid = checkPatternValidity(inputElement);
  const isLengthValid = checkLengthValidity(inputElement);
  
  if (!inputElement.validity.valid || !isPatternValid || !isLengthValid) {
    const errorMessage = getCustomErrorMessage(inputElement, inputElement.validity);
    showInputError(formElement, inputElement, errorMessage, config);
  } else {
    hideInputError(formElement, inputElement, config);
  }
};

const toggleButtonState = (inputList, buttonElement, config) => {
  const hasInvalidInput = inputList.some(inputElement => {
    return !inputElement.validity.valid || 
           !checkPatternValidity(inputElement) || 
           !checkLengthValidity(inputElement);
  });
  
  if (buttonElement) {
    if (hasInvalidInput) {
      buttonElement.classList.add(config.inactiveButtonClass);
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(config.inactiveButtonClass);
      buttonElement.disabled = false;
    }
  }
};

const setEventListeners = (formElement, config) => {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  
  toggleButtonState(inputList, buttonElement, config);
  
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, config);
      toggleButtonState(inputList, buttonElement, config);
    });
  });
};

export const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  
  formList.forEach((formElement) => {
    setEventListeners(formElement, config);
  });
};

export const clearValidation = (formElement, config) => {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  
  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, config);
  });
  
  toggleButtonState(inputList, buttonElement, config);
};