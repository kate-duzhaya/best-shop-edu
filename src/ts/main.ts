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
import { BASE_URL } from "./config.js";

console.log("main loaded");

window.addEventListener("DOMContentLoaded", () => {
  highlightActiveLink();
  displayHamburgerMenu();
  new LoginController().render();
  shoppingCart.subscribe(() => {
    showCartIconCounter(shoppingCart.getTotalItemsCount());
  });
});

const path = window.location.pathname.toLowerCase();

if (path.includes("/index.html") || path === BASE_URL) {
  initHomePage();
}
if (path.includes("/html/catalog.html")) {
  initCatalog();
}
if (path.includes("/html/product.html")) {
  initProductPage();
}
if (path.includes("/html/cart.html")) {
  initCartPage();
}
if (path.includes("/html/contact.html")) {
  initContactPage();
}
