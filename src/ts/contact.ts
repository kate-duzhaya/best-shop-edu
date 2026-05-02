import { Modal } from "./components/Modal";
import { InputValidation } from "./components/InputValidation";
import { BASE_URL } from "./config";

const validateContactForm = (): void => {
  const form = document.querySelector(".contact-form") as HTMLFormElement;
  const inputValidation = new InputValidation();
  const nameField = document.getElementById("contactName") as HTMLInputElement;
  const emailField = document.getElementById(
    "contactEmail",
  ) as HTMLInputElement;
  const topicField = document.getElementById(
    "contactTopic",
  ) as HTMLInputElement;
  const messageField = document.getElementById(
    "contactMesssage",
  ) as HTMLInputElement;

  if (nameField) {
    nameField.addEventListener("input", () => {
      inputValidation.validateIfNotEmpty(nameField, "Name");
    });
  }
  if (emailField) {
    emailField.addEventListener("input", () => {
      inputValidation.validateEmail(emailField);
    });
  }
  if (topicField) {
    topicField.addEventListener("input", () => {
      inputValidation.validateIfNotEmpty(topicField, "Topic");
    });
  }
  if (messageField) {
    messageField.addEventListener("input", () => {
      inputValidation.validateIfNotEmpty(messageField, "Message");
    });
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const isNameValid = inputValidation.validateIfNotEmpty(nameField, "Name");
    const isEmailValid = inputValidation.validateEmail(emailField);
    const isTopicValid = inputValidation.validateIfNotEmpty(
      topicField,
      "Topic",
    );
    const isMessageValid = inputValidation.validateIfNotEmpty(
      messageField,
      "Message",
    );

    if (!isNameValid || !isEmailValid || !isTopicValid || !isMessageValid) {
      return;
    }

    new Modal(`${BASE_URL}html/modalSuccessMsg.html`).open();

    for (const field of [nameField, emailField, topicField, messageField]) {
      field.value = "";
      field.parentElement?.classList.remove("success");
    }
  });
};

export const initContactPage = (): void => {
  validateContactForm();
};
