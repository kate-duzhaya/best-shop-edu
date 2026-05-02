import { renderCart, renderTotals } from "./components/CartView";
import { shoppingCart } from "./ShoppingCart";
import { Modal } from "./components/Modal";
import { BASE_URL } from "./config";

export const initCartPage = () => {
  shoppingCart.subscribe(renderCart);
  shoppingCart.subscribe(renderTotals);

  const clearCartBtn = document.getElementById(
    "clearCartBtn",
  ) as HTMLButtonElement;
  clearCartBtn?.addEventListener("click", () => {
    shoppingCart.clear();
    window.scrollTo(0, 0);
  });

  const checkoutBtn = document.getElementById(
    "checkoutBtn",
  ) as HTMLButtonElement;
  checkoutBtn.addEventListener("click", () => {
    shoppingCart.clear();
    window.scrollTo(0, 0);
    new Modal(`${BASE_URL}html/modalPurchase.html`).open();
  });
};
