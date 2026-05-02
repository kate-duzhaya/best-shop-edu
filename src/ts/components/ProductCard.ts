import { BASE_URL } from "../config";
import { Product, SectionType, ProductToCart } from "../product";
import { shoppingCart } from "../ShoppingCart";

const renderProductCardImage = (
  imgURL: string,
  productName: string,
  productId: string,
): HTMLAnchorElement => {
  const productLink: HTMLAnchorElement = document.createElement("a");
  productLink.href = `${BASE_URL}html/product.html?id=${productId}`;
  productLink.classList.add("product-card__image-box");
  const img: HTMLImageElement = document.createElement("img");
  const trimmedBase = BASE_URL.slice(0, BASE_URL.length - 1);
  img.src = `${trimmedBase}${imgURL}`;
  img.alt = productName;
  img.classList.add("product-card__image");
  productLink.append(img);
  return productLink;
};

const renderProductCardSaleBadge = (): HTMLDivElement => {
  const badge: HTMLDivElement = document.createElement("div");
  badge.textContent = "Sale";
  badge.classList.add("product-card__sale");
  return badge;
};

const renderProductCardName = (name: string): HTMLHeadingElement => {
  const productName: HTMLHeadingElement = document.createElement("h3");
  productName.textContent = name;
  productName.classList.add(
    "heading-tertiary",
    "heading-tertiary--black",
    "product-card__name",
  );
  return productName;
};

const renderProductCardPrice = (price: number): HTMLParagraphElement => {
  const productPrice: HTMLParagraphElement = document.createElement("p");
  productPrice.textContent = `$${price}`;
  productPrice.classList.add("product-card__price");
  return productPrice;
};

const renderProductCardButton = (
  productId: string,
  sectionType?: SectionType,
): HTMLButtonElement => {
  const cardBtn: HTMLButtonElement = document.createElement("button");
  if (sectionType === "new") {
    cardBtn.textContent = "View Product";
    cardBtn.classList.add(
      "btn",
      "btn--primary",
      "btn--primary--narrow",
      "product-card__btn",
    );
    cardBtn.setAttribute("data-type", "viewProductBtn");
  } else if (shoppingCart.isProductInCart(productId)) {
    cardBtn.disabled = true;
    cardBtn.textContent = "Added to cart";
    cardBtn.classList.add(
      "btn--primary",
      "product-card__btn",
      "btn--primary--narrow",
    );
  } else {
    cardBtn.textContent = "Add to Cart";
    cardBtn.classList.add(
      "btn",
      "btn--primary",
      "btn--primary--narrow",
      "product-card__btn",
    );
    cardBtn.setAttribute("data-type", "addToCartBtn");
  }
  return cardBtn;
};

const renderProductCard = (
  product: Product,
  section?: SectionType,
): HTMLDivElement => {
  const productCard: HTMLDivElement = document.createElement("div");
  productCard.classList.add(`product-card`);

  if (product.salesStatus) {
    const salesBadge: HTMLDivElement = renderProductCardSaleBadge();
    productCard.append(salesBadge);
  }

  const productImg: HTMLAnchorElement = renderProductCardImage(
    product.imageUrl,
    product.name,
    product.id,
  );
  const productName: HTMLHeadingElement = renderProductCardName(product.name);
  const productPrice: HTMLParagraphElement = renderProductCardPrice(
    product.price,
  );
  const productBtn: HTMLButtonElement = renderProductCardButton(
    product.id,
    section,
  );

  const productTextDiv: HTMLDivElement = document.createElement("div");
  productTextDiv.classList.add("product-card__right-side");
  productTextDiv.append(productName, productPrice, productBtn);
  productCard.append(productImg, productTextDiv);

  productBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const productToCart: ProductToCart = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.imageUrl,
      category: product.category,
      color: product.color,
      size: product.size,
      salesStatus: product.salesStatus,
      quantity: 1,
      total: product.price,
    };
    switch (productBtn.dataset.type) {
      case "addToCartBtn":
        shoppingCart.add(productToCart);
        productBtn.disabled = true;
        productBtn.textContent = "Added to cart";
        productBtn.classList.remove("btn");
        break;
      case "viewProductBtn":
        window.location.href = `${BASE_URL}html/product.html?id=${product.id}`;
        break;
      default:
        return;
    }
  });

  return productCard;
};

const renderSetCard = (set: Product): HTMLAnchorElement => {
  const setCard: HTMLAnchorElement = document.createElement("a");
  setCard.href = `${BASE_URL}html/product.html?id=${set.id}`;
  setCard.classList.add("catalog-grid__set");

  const imgWrapper: HTMLDivElement = document.createElement("div");
  imgWrapper.classList.add("catalog-grid__set-image-wrapper");

  const img: HTMLImageElement = document.createElement("img");
  img.classList.add("catalog-grid__set-image");
  img.src = `${BASE_URL}img/suitcases/${set.id}.jpg`;
  img.alt = set.name;
  imgWrapper.append(img);

  const textDiv: HTMLDivElement = document.createElement("div");
  textDiv.classList.add("catalog-grid__set-description");

  const setName: HTMLHeadingElement = document.createElement("h4");
  setName.classList.add("sets--description");
  setName.textContent = set.name;

  const setRating: HTMLDivElement = document.createElement("div");
  setRating.classList.add("static-stars", "product-rating");
  setRating.innerHTML = "&#9733;&#9733;&#9733;&#9733;&#9733;";
  setRating.setAttribute("style", `--rating: ${set.rating}`);
  setRating.setAttribute("aria-label", `${set.rating} out of 5 stars`);

  const setPrice: HTMLParagraphElement = document.createElement("p");
  setPrice.classList.add("sets--description");
  setPrice.textContent = `$${set.price}`;

  textDiv.append(setName, setRating, setPrice);

  setCard.append(imgWrapper, textDiv);
  return setCard;
};

export const renderProducts = (
  products: Product[],
  parentDiv: HTMLDivElement | null,
  section?: SectionType,
): void => {
  if (parentDiv) {
    parentDiv.innerHTML = "";

    products.forEach((product) => {
      const productCard =
        section === "bestSets"
          ? renderSetCard(product)
          : renderProductCard(product, section);
      parentDiv.append(productCard);
    });
  }
};
