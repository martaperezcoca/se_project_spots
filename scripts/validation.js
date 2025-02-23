const formEl = document.querySelector(".modal__form");
const inputEl = formEl.querySelector(".modal__input");

const showInputError = (formEl, inputEl, errorMessage) => {
  const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
  inputEl.classList.add("modal__input_type_error");
  errorMessageEl.textContent = errorMessage;
  errorMessageEl.classList.add("modal__error-active");
};

const hideInputError = (formEl, inputEl) => {
  const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
  inputEl.classList.remove("modal__input_type_error");
  errorMessageEl.classList.remove("modal__error-active");
  errorMessageEl.textContent = "";
};

const checkInputValidity = (formEl, inputEl) => {
  if (!inputEl.validity.valid) {
    showInputError(formEl, inputEl, inputEl.validationMessage);
  } else {
    hideInputError(formEl, inputEl);
  }
};

const setEventListeners = (formEl) => {
  const inputList = formEl.querySelectorAll(".modal__input");
  const buttonEl = formEl.querySelector(".modal__submit-btn");

  //todo - handle initial states
  // toggleButtonState(inputList, buttonEl);

  inputList.forEach((inputEl) => {
    inputEl.addEventListener("input", () => {
      checkInputValidity(formEl, inputEl);
    });
  });
};

const enableValidation = () => {
  const formList = document.querySelectorAll(".modal__form");
  formList.forEach((formEl) => {
    setEventListeners(formEl);
  });
};

enableValidation();
