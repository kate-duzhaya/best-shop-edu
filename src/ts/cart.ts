import { renderCart, renderTotals } from "./components/CartView";
import { shoppingCart } from "./ShoppingCart";
import { Modal } from "./components/Modal";

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
    new Modal("/html/modalPurchase.html").open();
  });
};
