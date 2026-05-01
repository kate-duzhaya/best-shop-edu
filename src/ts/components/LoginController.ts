import { TEST_EMAIL, TEST_PASSWORD } from "../config";
import { InputValidation } from "./InputValidation";
import { Modal } from "./Modal";

const inputValidation = new InputValidation();

export class LoginController {
  private _loginModal: Modal;
  private _emailField: HTMLInputElement | null = null;
  private _passField: HTMLInputElement | null = null;
  private _authErrorDiv: HTMLDivElement | null = null;

  constructor() {
    this._loginModal = new Modal("/html/modalLogin.html");
    this.init();
  }

  private init(): void {
    const openModalBtn = document.getElementById("openLoginModal");

    if (openModalBtn) {
      openModalBtn.addEventListener("click", async () => {
        await this._loginModal.open();
        this.attachEventListeners();
      });
    }
  }

  private attachEventListeners(): void {
    const loginForm = document.querySelector(".login-form") as HTMLFormElement;
    this._emailField = document.getElementById(
      "emailFieldLogin",
    ) as HTMLInputElement;
    this._passField = document.getElementById(
      "passwordFieldLogin",
    ) as HTMLInputElement;

    if (loginForm) {
      loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        this.handleLoginSubmit();
      });
      loginForm.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          this.handleLoginSubmit();
        }
      });
    }

    if (this._emailField) {
      this._emailField.addEventListener("input", () => {
        inputValidation.validateEmail(this._emailField as HTMLInputElement);
      });
    }

    if (this._passField) {
      this._passField.addEventListener("input", () => {
        inputValidation.validatePassword(this._passField as HTMLInputElement);
      });
      const revealPass = document.querySelector(
        ".reveal-pass",
      ) as HTMLImageElement;
      if (revealPass) {
        revealPass.addEventListener("click", () => {
          const type =
            this._passField?.getAttribute("type") === "password"
              ? "text"
              : "password";
          this._passField?.setAttribute("type", type);
          const imgSrc =
            this._passField?.getAttribute("type") === "password"
              ? "../../assets/img/icons/eye.svg"
              : "../../assets/img/icons/eye-filled.svg";
          revealPass.src = imgSrc;
        });
      }
    }
  }

  private handleLoginSubmit(): void {
    const isEmailValidUI = inputValidation.validateEmail(
      this._emailField as HTMLInputElement,
    );
    const isPassValidUI = inputValidation.validatePassword(
      this._passField as HTMLInputElement,
    );

    if (!isEmailValidUI || !isPassValidUI) {
      return;
    }
    const enteredEmail = this._emailField?.value;
    const enteredPass = this._passField?.value;
    this._authErrorDiv = document.querySelector(
      ".auth-error",
    ) as HTMLDivElement;

    if (enteredEmail === TEST_EMAIL && enteredPass === TEST_PASSWORD) {
      this.handleSuccessfulLogin();
    } else {
      this.displayAuthError();
    }
  }

  private handleSuccessfulLogin() {
    if (this._authErrorDiv) {
      this._authErrorDiv.innerText = "";
    }
    this._loginModal.close();
  }

  private displayAuthError() {
    if (this._authErrorDiv) {
      this._authErrorDiv.innerText = "Your email or password is incorrect";
    }
  }
}
