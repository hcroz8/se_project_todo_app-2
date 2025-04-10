class FormValidator {
    constructor (settings, formEl) {
        this._inputSelector = settings.inputSelector;
        this._submitButtonSelector = settings.submitButtonSelector;
        this._errorClass = settings.errorClass;
        this._inputErrorClass = settings.inputErrorClass;
        this._inactiveButtonClass = settings.inactiveButtonClass;
        this._formEl = formEl;
    }
    // Create/Copy missing function from the validate.js file
    // Reset the form when close the modal
    // 

    _showInputError = (formElement, inputElement, errorMessage, settings) => {
      const errorElementId = `#${inputElement.id}-error`;
      const errorElement = formElement.querySelector(errorElementId);
      inputElement.classList.add(settings.inputErrorClass);
      errorElement.textContent = errorMessage;
      errorElement.classList.add(settings.errorClass);
    };

    _hideInputError = (formElement, inputElement, settings) => {
      const errorElementId = `#${inputElement.id}-error`;
      const errorElement = formElement.querySelector(errorElementId);
      inputElement.classList.remove(settings.inputErrorClass);
      errorElement.classList.remove(settings.errorClass);
      errorElement.textContent = "";
    };

    _hasInvalidInput = (inputList) => {
      return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
      });
    };
    
    _toggleButtonState = (inputList, buttonElement, settings) => {
      if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(settings.inactiveButtonClass);
        buttonElement.disabled = true;
      } else {
        buttonElement.classList.remove(settings.inactiveButtonClass);
        buttonElement.disabled = false;
      }
    };
    
    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            showInputError(
              formElement,
              inputElement,
              inputElement.validationMessage,
              settings,
            );
          } else {
            hideInputError(formElement, inputElement, settings);
          }
        };
  
    _setEventListeners() {
        this._inputList = Array.from(
          this._formEl.querySelectorAll(
            this._inputSelector
          ));
          this._buttonElement = this._formEl.querySelector(this._submitButtonSelector);
        
          this._inputList.forEach((inputElement) => {
            inputElement.addEventListener("input", () => {
              this._checkInputValidity(inputElement);
              toggleButtonState(this._inputList, this._buttonElement, settings);
            });
          });
        }
        
    enableValidation() {
        this._formEl.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        this._setEventListeners()
        console.log(">>>>>", this._formEl);
    }
  }

  resetValidation = (formEl, inputList, settings) => {
    inputList.forEach((input) => {
      hideInputError(formEl, input, settings);
    });
  };
  
  export default FormValidator;