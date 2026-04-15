const searchKey = {
    selected: "Selected Products",
    new: "New Products Arrival",
    liked: "You May Also Like",
};
let allProducts = undefined;
const loadAllProducts = async () => {
    const response = await fetch("../../src/assets/data.json");
    const json = await response.json();
    allProducts = json.data;
    return json.data;
};
const getAllProducts = async () => {
    if (allProducts) {
        return allProducts;
    }
    else {
        return await loadAllProducts();
    }
};
const filterProductsBySection = (products, sectionType) => {
    return products.filter((product) => {
        return product.blocks.indexOf(searchKey[sectionType]) >= 0;
    });
};
const renderProductCardImage = (imgURL, productName) => {
    const imgBox = document.createElement("div");
    imgBox.classList.add("product-card__image-box");
    const img = document.createElement("img");
    img.src = imgURL;
    img.alt = productName;
    img.classList.add("product-card__image");
    imgBox.append(img);
    return imgBox;
};
const renderProductCardSaleBadge = () => {
    const badge = document.createElement("div");
    badge.textContent = "Sale";
    badge.classList.add("product-card__sale");
    return badge;
};
const renderProductCardName = (name) => {
    const productName = document.createElement("h3");
    productName.textContent = name;
    productName.classList.add("heading-tertiary", "heading-tertiary--black", "product-card__name");
    return productName;
};
const renderProductCardPrice = (price) => {
    const productPrice = document.createElement("p");
    productPrice.textContent = `$${price}`;
    productPrice.classList.add("product-card__price");
    return productPrice;
};
const renderProductCardButton = (sectionType) => {
    const addToCartBtn = document.createElement("button");
    addToCartBtn.textContent =
        sectionType === "new" ? "View Product" : "Add to Cart";
    addToCartBtn.classList.add("btn", "btn--primary", "btn--primary--narrow", "product-card__btn");
    return addToCartBtn;
};
export const renderProductsSection = async (sectionType) => {
    const products = await getAllProducts();
    const filteredProducts = filterProductsBySection(products, sectionType);
    const productList = document.querySelector(`.${sectionType}__products`);
    filteredProducts.forEach((product) => {
        const productCard = document.createElement("div");
        productCard.classList.add(`product-card`);
        if (product.salesStatus) {
            const salesBadge = renderProductCardSaleBadge();
            productCard.append(salesBadge);
        }
        const productImg = renderProductCardImage(product.imageUrl, product.name);
        const productName = renderProductCardName(product.name);
        const productPrice = renderProductCardPrice(product.price);
        const productBtn = renderProductCardButton(sectionType);
        productCard.append(productImg, productName, productPrice, productBtn);
        productList?.append(productCard);
    });
};
export const scrollImageSlider = () => {
    const scrollContainer = document.querySelector(".slider__gallery");
    const btnBack = document.querySelector(".slider__btn--back");
    const btnFrwd = document.querySelector(".slider__btn--frwd");
    if (!btnBack || !btnFrwd || !scrollContainer)
        return;
    scrollContainer.addEventListener("scrollend", () => {
        const atStart = scrollContainer.scrollLeft <= 0;
        const atEnd = scrollContainer.scrollLeft + scrollContainer.clientWidth >=
            scrollContainer.scrollWidth;
        btnBack.classList.toggle("slider__btn--disabled", atStart);
        btnFrwd.classList.toggle("slider__btn--disabled", atEnd);
    });
    btnFrwd?.addEventListener("click", () => {
        if (scrollContainer) {
            scrollContainer.scrollBy(1340, 0);
        }
    });
    btnBack?.addEventListener("click", () => {
        if (scrollContainer) {
            scrollContainer.scrollBy(-1340, 0);
        }
    });
};
