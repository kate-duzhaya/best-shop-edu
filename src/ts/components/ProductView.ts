import { Product, ProductToCart } from "../product";
import { renderProducts } from "./ProductCard";
import { InputValidation } from "./InputValidation";
import { Modal } from "./Modal";
import { shoppingCart } from "../ShoppingCart";

const inputValidation = new InputValidation();

export class ProductView {
  private readonly _product: Product;
  private readonly _sizes: string[] | undefined;
  private readonly _colors: string[] | undefined;
  private readonly _relatedProducts: Product[];

  constructor(
    product: Product,
    sizes: string[] | undefined,
    colors: string[] | undefined,
    relatedProducts: Product[],
  ) {
    this._product = product;
    this._sizes = sizes;
    this._colors = colors;
    this._relatedProducts = relatedProducts;
    this.renderProductView();
  }

  private renderProductView() {
    const nameElements: NodeListOf<HTMLHeadingElement | HTMLSpanElement> =
      document.querySelectorAll(".product-name");
    const ratingElements: NodeListOf<HTMLDivElement> =
      document.querySelectorAll(".product-rating");
    const priceElement = document.getElementById(
      "productPrice",
    ) as HTMLParagraphElement;
    const mainImgElement = document.querySelector(
      ".product-gallery__img--main",
    ) as HTMLImageElement;

    if (nameElements) {
      nameElements.forEach((name) => {
        name.textContent = `${this._product.name}`;
      });
    }

    if (ratingElements) {
      ratingElements.forEach((rating) => {
        rating.setAttribute("style", `--rating: ${this._product.rating}`);
        rating.setAttribute(
          "aria-label",
          `${this._product.rating} out of 5 stars`,
        );
      });
    }

    if (priceElement) priceElement.textContent = `$${this._product.price}`;

    if (mainImgElement) {
      mainImgElement.src = `${this._product.imageUrl}`;
      mainImgElement.alt = `${this._product.name} in ${this._product.color}`;
    }

    this.renderSelectionForm();
    this.renderTabs();
    this.rateProduct();
    this.submitReview();
    this.renderYouMayLikeProducts();
  }

  private renderTabs() {
    const tabs = document.querySelectorAll(".btn--tab");
    const contentDivs = document.querySelectorAll(".tabs__content");

    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        tabs.forEach((tab) => {
          tab.classList.remove("btn--active-tab");
        });
        contentDivs.forEach((div) => {
          div.classList.add("u-hidden");
          if (
            (div as HTMLDivElement).dataset.content ===
            (tab as HTMLButtonElement).dataset.tab
          ) {
            div.classList.remove("u-hidden");
            tab.classList.add("btn--active-tab");
          }
        });
      });
    });
  }

  private renderSelectionForm() {
    const selectSizeField = document.getElementById(
      "productDetailsSize",
    ) as HTMLSelectElement;
    const selectColorField = document.getElementById(
      "productDetailsColor",
    ) as HTMLSelectElement;
    const selectCategoryField = document.getElementById(
      "productDetailsCategory",
    ) as HTMLSelectElement;
    const selectQuantityField = document.getElementById(
      "productDetailsQuantity",
    ) as HTMLInputElement;
    const addToCartBtn = document.getElementById(
      "productDetailsAddToCart",
    ) as HTMLButtonElement;
    const form = document.getElementById(
      "productDetailsForm",
    ) as HTMLFormElement;

    if (!this._colors || !this._sizes) return;

    this._sizes.forEach((size) => {
      const option = document.createElement("option");
      option.value = size.toUpperCase();
      option.textContent = size.toUpperCase();
      if (this._product.size === size) option.setAttribute("selected", "");
      selectSizeField?.append(option);
    });

    this._colors.forEach((color) => {
      const option = document.createElement("option");
      option.value = color;
      option.textContent = color.charAt(0).toUpperCase() + color.slice(1);
      if (this._product.color === color) option.setAttribute("selected", "");
      selectColorField?.append(option);
    });

    const categoryOption = document.createElement("option");
    categoryOption.value = this._product.category;
    categoryOption.textContent =
      this._product.category.charAt(0).toUpperCase() +
      this._product.category.slice(1);
    categoryOption.setAttribute("selected", "");
    selectCategoryField?.append(categoryOption);

    this.checkQuantity();

    form.addEventListener("submit", (e) => {
      e.preventDefault();
    });

    addToCartBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const isQuantityValid =
        inputValidation.validateQuantity(selectQuantityField);
      if (
        !isQuantityValid ||
        !selectSizeField.value ||
        !selectColorField.value ||
        !selectCategoryField.value
      ) {
        return;
      }

      const productToCart: ProductToCart = {
        id: this._product.id,
        name: this._product.name,
        price: this._product.price,
        image: this._product.imageUrl,
        category: this._product.category,
        color: this._product.color,
        size: this._product.size,
        salesStatus: this._product.salesStatus,
        quantity: Number(selectQuantityField.value),
        total: Number(selectQuantityField.value) * this._product.price,
      };
      shoppingCart.add(productToCart);
    });
  }

  private renderYouMayLikeProducts() {
    const productsElement = document.querySelector(
      ".suggested__products",
    ) as HTMLDivElement;
    renderProducts(this._relatedProducts, productsElement);
  }

  private rateProduct() {
    const stars: NodeListOf<HTMLSpanElement> =
      document.querySelectorAll(".star");
    const ratingInput: HTMLInputElement = document.getElementById(
      "rating-value",
    ) as HTMLInputElement;

    stars.forEach((star) => {
      star.addEventListener("click", () => {
        const clickedVal: string = star.dataset.value as string;
        ratingInput.value = clickedVal;
        stars.forEach((s) => {
          if (Number(s.dataset.value as string) <= Number(clickedVal)) {
            s.innerHTML = `&#9733;`;
          } else {
            s.innerHTML = `&#9734;`;
          }
        });
      });
    });
  }

  private submitReview() {
    const form = document.getElementById("reviewForm") as HTMLFormElement;
    const reviewEl = document.getElementById("reviewText") as HTMLInputElement;
    const nameEl = document.getElementById("reviewName") as HTMLInputElement;
    const emailEl = document.getElementById("reviewEmail") as HTMLInputElement;

    reviewEl.addEventListener("blur", () => {
      inputValidation.validateIfNotEmpty(reviewEl, "Review text");
    });

    nameEl.addEventListener("blur", () => {
      inputValidation.validateIfNotEmpty(nameEl, "Name");
    });

    emailEl.addEventListener("blur", () => {
      inputValidation.validateEmail(emailEl);
    });

    form?.addEventListener("submit", (e) => {
      e.preventDefault();

      const isReviewValid = inputValidation.validateIfNotEmpty(
        reviewEl,
        "Review text",
      );
      const isNameValid = inputValidation.validateIfNotEmpty(nameEl, "Name");
      const isEmailValid = inputValidation.validateEmail(emailEl);

      if (!isReviewValid || !isNameValid || !isEmailValid) return;

      new Modal("/html/modalSuccessMsg.html").open();
    });
  }

  private checkQuantity() {
    const reduceQuantBtn = document.querySelector(
      ".quantity__btn--minus",
    ) as HTMLButtonElement;
    const increaseQuantBtn = document.querySelector(
      ".quantity__btn--plus",
    ) as HTMLButtonElement;
    const quantityInput = document.getElementById(
      "productDetailsQuantity",
    ) as HTMLInputElement;

    reduceQuantBtn.addEventListener("click", () => {
      const value = Number(quantityInput.value);
      if (value <= 1) return;
      quantityInput.value = String(value - 1);
      inputValidation.validateQuantity(quantityInput);
    });

    increaseQuantBtn.addEventListener("click", () => {
      const value = Number(quantityInput.value);
      if (value >= 50) return;
      quantityInput.value = String(value + 1);
      inputValidation.validateQuantity(quantityInput);
    });

    quantityInput.addEventListener("blur", () => {
      inputValidation.validateQuantity(quantityInput);
    });

    quantityInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        inputValidation.validateQuantity(quantityInput);
      }
    });
  }
}
