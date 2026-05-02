import { defineConfig } from "vite";
import injectHTML from "vite-plugin-html-inject";
import { resolve } from "path";

export default defineConfig({
  base: "/",
  root: "src",
  publicDir: resolve(__dirname, "public"),
  build: {
    outDir: "../dist",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        about: resolve(__dirname, "src/html/about.html"),
        banner: resolve(__dirname, "src/html/banner.html"),
        cart: resolve(__dirname, "src/html/cart.html"),
        catalog: resolve(__dirname, "src/html/catalog.html"),
        contact: resolve(__dirname, "src/html/contact.html"),
        footer: resolve(__dirname, "src/html/footer.html"),
        header: resolve(__dirname, "src/html/header.html"),
        modalLogin: resolve(__dirname, "src/html/modalLogin.html"),
        modalPurchase: resolve(__dirname, "src/html/modalPurchase.html"),
        modalSuccessMsg: resolve(__dirname, "src/html/modalSuccessMsg.html"),
        product: resolve(__dirname, "src/html/product.html"),
      },
    },
  },
  plugins: [injectHTML()],
});
