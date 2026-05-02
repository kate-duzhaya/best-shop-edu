import { ProductService } from "./ProductService";
import { ProductView } from "./components/ProductView";
import { BASE_URL } from "./config";

const productService = new ProductService();

const displayError = (error: unknown) => {
  const errorMsg = document.createElement("p");
  errorMsg.textContent = String(error);
  document.body.innerHTML = "";
  document.body.append(errorMsg);
};

export const initProductPage = () => {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get("id");

    if (!productId) {
      throw new Error("No product ID provided in the URL");
    }

    const product = productService.getProductById(productId);

    if (!product) {
      throw new Error("The product is not found");
    }

    const sizes = productService.getAvailableSizes(product);
    const colors = productService.getAvailableColors(product);
    const youMayLikeProducts = productService.getYouMayLikeProducts(product);

    new ProductView(product, sizes, colors, youMayLikeProducts);

    window.addEventListener("DOMContentLoaded", () => {
      const sizeField = document.getElementById(
        "productDetailsSize",
      ) as HTMLSelectElement;
      const colorField = document.getElementById(
        "productDetailsColor",
      ) as HTMLSelectElement;

      sizeField.addEventListener("change", () => {
        const newProductId = productService.getNewSizeColorComboProductId(
          product.groupId,
          sizeField.value,
          colorField.value,
          "size",
        );
        window.location.href = `${BASE_URL}html/product.html?id=${newProductId}`;
      });

      colorField.addEventListener("change", () => {
        const newProductId = productService.getNewSizeColorComboProductId(
          product.groupId,
          sizeField.value,
          colorField.value,
          "color",
        );
        window.location.href = `${BASE_URL}html/product.html?id=${newProductId}`;
      });
    });
  } catch (err: unknown) {
    displayError(err);
  }
};
