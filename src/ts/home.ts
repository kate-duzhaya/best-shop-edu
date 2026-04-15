interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
  color: string;
  size: string;
  salesStatus: boolean;
  rating: number;
  popularity: number;
  blocks: string[];
}

interface ProductResponse {
  data: Product[];
}

type SectionType = "selected" | "new" | "liked";

const searchKey: Record<SectionType, string> = {
  selected: "Selected Products",
  new: "New Products Arrival",
  liked: "You May Also Like",
};

let allProducts: Product[] | undefined = undefined;

const loadAllProducts = async (): Promise<Product[]> => {
  const response = await fetch("../../src/assets/data.json");
  const json: ProductResponse = await response.json();
  allProducts = json.data;
  return json.data;
};

const getAllProducts = async (): Promise<Product[]> => {
  if (allProducts) {
    return allProducts;
  } else {
    return await loadAllProducts();
  }
};

const filterProductsBySection = (
  products: Product[],
  sectionType: SectionType,
): Product[] => {
  return products.filter((product) => {
    return product.blocks.indexOf(searchKey[sectionType]) >= 0;
  });
};

const renderProductCardImage = (
  imgURL: string,
  productName: string,
): HTMLDivElement => {
  const imgBox: HTMLDivElement = document.createElement("div");
  imgBox.classList.add("product-card__image-box");
  const img: HTMLImageElement = document.createElement("img");
  img.src = imgURL;
  img.alt = productName;
  img.classList.add("product-card__image");
  imgBox.append(img);
  return imgBox;
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
  sectionType: SectionType,
): HTMLButtonElement => {
  const addToCartBtn: HTMLButtonElement = document.createElement("button");
  addToCartBtn.textContent =
    sectionType === "new" ? "View Product" : "Add to Cart";
  addToCartBtn.classList.add(
    "btn",
    "btn--primary",
    "btn--primary--narrow",
    "product-card__btn",
  );
  return addToCartBtn;
};

export const renderProductsSection = async (
  sectionType: SectionType,
): Promise<void> => {
  const products: Product[] = await getAllProducts();
  const filteredProducts: Product[] = filterProductsBySection(
    products,
    sectionType,
  );

  const productList: HTMLDivElement | null = document.querySelector(
    `.${sectionType}__products`,
  );
  filteredProducts.forEach((product) => {
    const productCard: HTMLDivElement = document.createElement("div");
    productCard.classList.add(`product-card`);
    if (product.salesStatus) {
      const salesBadge: HTMLDivElement = renderProductCardSaleBadge();
      productCard.append(salesBadge);
    }
    const productImg: HTMLDivElement = renderProductCardImage(
      product.imageUrl,
      product.name,
    );
    const productName: HTMLHeadingElement = renderProductCardName(product.name);
    const productPrice: HTMLParagraphElement = renderProductCardPrice(
      product.price,
    );
    const productBtn: HTMLButtonElement = renderProductCardButton(sectionType);
    productCard.append(productImg, productName, productPrice, productBtn);
    productList?.append(productCard);
  });
};

export const scrollImageSlider = (): void => {
  const scrollContainer: HTMLDivElement | null =
    document.querySelector(".slider__gallery");
  const btnBack: HTMLImageElement | null =
    document.querySelector(".slider__btn--back");
  const btnFrwd: HTMLImageElement | null =
    document.querySelector(".slider__btn--frwd");

  if (!btnBack || !btnFrwd || !scrollContainer) return;

  scrollContainer.addEventListener("scrollend", () => {
    const atStart = scrollContainer.scrollLeft <= 0;
    const atEnd =
      scrollContainer.scrollLeft + scrollContainer.clientWidth >=
      scrollContainer.scrollWidth;

    btnBack.classList.toggle("slider__btn--disabled", atStart);
    btnFrwd.classList.toggle("slider__btn--disabled", atEnd);
  });

  btnFrwd?.addEventListener("click", (): void => {
    if (scrollContainer) {
      scrollContainer.scrollBy(1340, 0);
    }
  });

  btnBack?.addEventListener("click", (): void => {
    if (scrollContainer) {
      scrollContainer.scrollBy(-1340, 0);
    }
  });
};
