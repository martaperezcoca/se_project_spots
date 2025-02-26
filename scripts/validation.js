const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit-btn",
  inactiveButtonClass: "modal__submit-btn_inactive",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_active",
};

const showInputError = (formEl, inputEl, errorMessage, config) => {
  const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
  inputEl.classList.add(config.inputErrorClass);
  errorMessageEl.textContent = errorMessage;
  errorMessageEl.classList.add(config.errorClass);
};

const hideInputError = (formEl, inputEl, config) => {
  const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
  inputEl.classList.remove(config.inputErrorClass);
  errorMessageEl.classList.remove(config.errorClass);
  errorMessageEl.textContent = "";
};

const checkInputValidity = (formEl, inputEl, config) => {
  if (!inputEl.validity.valid) {
    showInputError(formEl, inputEl, inputEl.validationMessage, config);
  } else {
    hideInputError(formEl, inputEl, config);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputEl) => {
    return !inputEl.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonEl, config) => {
  if (hasInvalidInput(inputList)) {
    disabledButton(buttonEl, config);
  } else {
    buttonEl.disabled = false;
    buttonEl.classList.remove(config.inactiveButtonClass);
  }
};

const disabledButton = (buttonEl, config) => {
  buttonEl.disabled = true;
  buttonEl.classList.add(config.inactiveButtonClass);
};

const resetValidation = (formEl, inputList, config) => {
  inputList.forEach((inputEl, config) => {
    hideInputError(formEl, inputEl, config);
  });
};

const setEventListeners = (formEl, config) => {
  const inputList = Array.from(formEl.querySelectorAll(config.inputSelector));
  const buttonEl = formEl.querySelector(config.submitButtonSelector);

  toggleButtonState(inputList, buttonEl, config);

  inputList.forEach((inputEl) => {
    inputEl.addEventListener("input", (event) => {
      checkInputValidity(formEl, inputEl, config);
      toggleButtonState(inputList, buttonEl, config);
    });
  });
};

const enableValidation = (config) => {
  const formList = document.querySelectorAll(config.formSelector);
  formList.forEach((formEl) => {
    setEventListeners(formEl, config);
  });
};

enableValidation(settings);
