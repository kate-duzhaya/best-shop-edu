import { initHomePage } from "./home.js";
import { initCatalog } from "./catalog.js";
import { initProductPage } from "./productPage.js";
import { initCartPage } from "./cart.js";
import {
  highlightActiveLink,
  displayHamburgerMenu,
} from "./components/Navigation.js";
import { LoginController } from "./components/LoginController.js";
import { shoppingCart } from "./ShoppingCart.js";
import { showCartIconCounter } from "./components/CartView.js";
import { initContactPage } from "./contact.js";

window.addEventListener("DOMContentLoaded", () => {
  highlightActiveLink();
  displayHamburgerMenu();
  new LoginController().render();
  shoppingCart.subscribe(() => {
    showCartIconCounter(shoppingCart.getTotalItemsCount());
  });
});

const path = window.location.pathname.toLowerCase();

if (path === "/index.html" || path === "/") {
  initHomePage();
}
if (path === "/html/catalog.html") {
  initCatalog();
}
if (path === "/html/product.html") {
  initProductPage();
}
if (path === "/html/cart.html") {
  initCartPage();
}
if (path === "/html/contact.html") {
  initContactPage();
}
