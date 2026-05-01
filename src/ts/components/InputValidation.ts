export class InputValidation {
  validateIfNotEmpty(element: HTMLInputElement, fieldName: string) {
    const fieldValue = element.value.trim();
    let isValid = false;
    if (!fieldValue) {
      this.setError(element, `${fieldName} is required`);
    } else {
      this.setSuccess(element);
      isValid = true;
    }
    return isValid;
  }

  validateEmail(element: HTMLInputElement): boolean {
    const emailValue = element.value.trim();
    let isValid = false;
    if (!this.validateIfNotEmpty(element, "Email")) {
      return isValid;
    } else if (!this.isValidEmail(emailValue)) {
      this.setError(element, "Email must follow the format: name@example.com");
    } else {
      this.setSuccess(element);
      isValid = true;
    }
    return isValid;
  }

  validatePassword(element: HTMLInputElement): boolean {
    const passValue = element.value.trim();
    const containerEl = document.querySelector(
      ".field-with-icon",
    ) as HTMLDivElement;
    let isValid = false;

    if (!passValue) {
      this.setError(containerEl, "Password is required");
    } else {
      this.setSuccess(containerEl);
      isValid = true;
    }
    return isValid;
  }

  validateQuantity(element: HTMLInputElement): boolean {
    const quantityValue = element.value.trim();
    const containerEl = document.querySelector(
      ".product-info__form-buttons",
    ) as HTMLDivElement;
    let isValid = false;

    if (!quantityValue || +quantityValue < 1 || +quantityValue > 50) {
      this.setError(containerEl, "Quantity must be from 1 to 50");
    } else {
      this.setSuccess(containerEl);
      isValid = true;
    }
    return isValid;
  }

  private setError(
    element: HTMLInputElement | HTMLDivElement,
    message: string,
  ) {
    const inputControl = element.parentElement as HTMLDivElement;
    const errorDisplay = inputControl.querySelector(
      ".input-error",
    ) as HTMLDivElement;

    errorDisplay.innerText = message;
    inputControl.classList.add("error");
    inputControl.classList.remove("success");
  }

  private setSuccess(element: HTMLInputElement | HTMLDivElement) {
    const inputControl = element.parentElement as HTMLDivElement;
    const errorDisplay = inputControl.querySelector(
      ".input-error",
    ) as HTMLDivElement;

    errorDisplay.innerText = "";
    inputControl.classList.add("success");
    inputControl.classList.remove("error");
  }

  private isValidEmail(email: string) {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  }
}
