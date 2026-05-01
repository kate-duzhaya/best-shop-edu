import { ProductToCart } from "../product";
import { shoppingCart } from "../ShoppingCart";
import { SHIPPING_PRICE } from "../config";

const renderCartProduct = (product: ProductToCart): HTMLDivElement => {
  const cartRow: HTMLDivElement = document.createElement("div");
  cartRow.setAttribute("role", "row");
  cartRow.classList.add("cart__row");

  const imgCell: HTMLDivElement = document.createElement("div");
  const img: HTMLImageElement = document.createElement("img");
  img.classList.add("cart__img");
  img.src = product.image;
  img.alt = product.name;
  imgCell.append(img);

  const cellGroup: HTMLDivElement = document.createElement("div");
  cellGroup.classList.add("cart__cell-group");

  const nameCell: HTMLDivElement = document.createElement("div");
  nameCell.textContent = product.name;

  const priceCell: HTMLDivElement = document.createElement("div");
  priceCell.textContent = `$${product.price}`;

  const quantityCell: HTMLDivElement = document.createElement("div");
  quantityCell.classList.add("cart__quantity");
  const minusBtn: HTMLButtonElement = document.createElement("button");
  const plusBtn: HTMLButtonElement = document.createElement("button");
  const inputField: HTMLInputElement = document.createElement("input");

  for (const btn of [minusBtn, plusBtn]) {
    btn.type = "button";
    btn.classList.add("btn", "quantity__btn", "quantity__btn--cart");
  }
  minusBtn.classList.add("quantity__btn--minus");
  plusBtn.classList.add("quantity__btn--plus");

  minusBtn.textContent = "-";
  plusBtn.textContent = "+";

  inputField.type = "number";
  inputField.name = "quantity";
  inputField.value = `${product.quantity}`;
  inputField.setAttribute("disabled", "");
  inputField.classList.add(
    "input-field",
    "input-field--quantity",
    "cart-quantity",
  );

  minusBtn.addEventListener("click", () => {
    shoppingCart.decrement(product.id);
  });

  plusBtn.addEventListener("click", () => {
    shoppingCart.increment(product.id);
  });

  quantityCell.append(minusBtn, inputField, plusBtn);

  const totalCell: HTMLDivElement = document.createElement("div");
  totalCell.textContent = `$${product.total}`;

  cellGroup.append(nameCell, priceCell, quantityCell);

  const btnCell: HTMLDivElement = document.createElement("div");
  const removeBtn: HTMLButtonElement = document.createElement("button");
  const btnImg: HTMLImageElement = document.createElement("img");
  btnImg.src = "../../assets/img/icons/trash-can.svg";
  btnImg.alt = "Remove item";
  removeBtn.classList.add("btn", "remove-item");
  removeBtn.type = "button";
  removeBtn.append(btnImg);

  removeBtn.addEventListener("click", () => {
    shoppingCart.remove(product.id);
  });

  btnCell.append(removeBtn);

  for (const cell of [
    imgCell,
    nameCell,
    priceCell,
    quantityCell,
    totalCell,
    btnCell,
  ]) {
    cell.classList.add("cart__cell");
    cell.role = "cell";
  }

  cartRow.append(imgCell, cellGroup, totalCell, btnCell);
  return cartRow;
};

export const renderTotals = () => {
  const subTotalEl = document.getElementById(
    "subTotal",
  ) as HTMLParagraphElement;
  const discountDiv = document.querySelector(
    ".cart__discount",
  ) as HTMLDivElement;
  const discountEl = document.getElementById(
    "discount",
  ) as HTMLParagraphElement;
  const shippingEl = document.getElementById(
    "shippingPrice",
  ) as HTMLParagraphElement;
  const totalEl = document.getElementById("total") as HTMLParagraphElement;

  const discount = shoppingCart.getDiscount();
  if (discount === 0) {
    discountDiv.classList.add("u-hidden");
  } else {
    discountDiv.classList.remove("u-hidden");
    discountEl.textContent = `$${discount}`;
  }

  subTotalEl.textContent = `$${shoppingCart.getSubtotal()}`;
  shippingEl.textContent = `$${SHIPPING_PRICE}`;
  totalEl.textContent = `$${shoppingCart.getTotal()}`;
};

export const showCartIconCounter = (itemsCount: number) => {
  const cartCountElement = document.querySelector(
    ".cart__count",
  ) as HTMLDivElement;
  if (itemsCount === 0) {
    cartCountElement.innerText = "";
    cartCountElement?.classList.add("u-hidden");
  } else {
    cartCountElement.innerText = String(itemsCount);
    cartCountElement.classList.remove("u-hidden");
  }
};

export const renderCart = (products: ProductToCart[]): void => {
  const cart = document.querySelector(".cart__table ") as HTMLDivElement;
  const cartProducts = document.querySelector(
    ".cart__products",
  ) as HTMLDivElement;
  const emptyMessage = document.querySelector(".empty-cart") as HTMLDivElement;
  const cartControls = document.querySelector(
    ".cart__control",
  ) as HTMLDivElement;

  if (products.length === 0 || !products) {
    emptyMessage.classList.remove("u-hidden");
    cart.classList.add("u-hidden");
    cartControls.classList.add("u-hidden");
    return;
  }

  if (products.length > 0) {
    emptyMessage.classList.add("u-hidden");
    cart.classList.remove("u-hidden");
    cartProducts.innerHTML = "";
    cartControls.classList.remove("u-hidden");

    for (const product of products) {
      cartProducts.append(renderCartProduct(product));
    }
  }
};
