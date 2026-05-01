import { ProductService } from "./ProductService";
import { renderProducts } from "./components/ProductCard";
import { scrollImageSlider } from "./components/ImageSlider";

export const initHomePage = (): void => {
  const products = new ProductService();

  const selectedProductsSection: HTMLDivElement | null =
    document.querySelector(`.selected__products`);
  const newArrivalsSection: HTMLDivElement | null =
    document.querySelector(`.new__products`);

  const selectedProducts = products.getSelectedProducts();
  const newArrivalProducts = products.getNewArrivalProducts();

  renderProducts(selectedProducts, selectedProductsSection);
  renderProducts(newArrivalProducts, newArrivalsSection, "new");
  scrollImageSlider();
};
