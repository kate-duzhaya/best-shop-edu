import * as data from "../assets/data.json";
import * as productTypes from "./product";
import { SECTION_PRODUCTS, RANDOM_SETS, RESULTS_PER_PAGE } from "./config";
import { state } from "./state";

export class ProductService {
  private readonly _productList: productTypes.Product[];
  private _catalogProducts: productTypes.Product[] = [];

  constructor() {
    this._productList = data.data;
  }

  getAllProducts(): productTypes.Product[] {
    return this._productList;
  }

  getDefaultProducts(): productTypes.Product[] {
    return this._productList.filter((product) => product.isDefault === true);
  }

  private getRandomProducts(
    products: productTypes.Product[],
    num: number,
  ): productTypes.Product[] {
    const randomNumbers: Set<number> = new Set();
    if (num <= products.length) {
      while (randomNumbers.size < num) {
        const randomNum: number = Math.floor(Math.random() * products.length);
        randomNumbers.add(randomNum);
      }
    } else {
      return products;
    }
    return [...randomNumbers].map((item) => {
      return products[item];
    });
  }

  getRandomSets(): productTypes.Product[] {
    const allSets = this._productList.filter(
      (product) =>
        product.category === "luggage sets" && product.isDefault === true,
    );
    return this.getRandomProducts(allSets, RANDOM_SETS);
  }

  getSelectedProducts() {
    return this._productList.filter((product) =>
      product.blocks.includes("Selected Products"),
    );
  }

  getNewArrivalProducts() {
    return this._productList.filter((product) =>
      product.blocks.includes("New Products Arrival"),
    );
  }

  getYouMayLikeProducts(openedProduct: productTypes.Product) {
    const productsToDisplay = this.getDefaultProducts().filter(
      (product) => openedProduct.id !== product.id,
    );

    return this.getRandomProducts(productsToDisplay, SECTION_PRODUCTS);
  }

  private getFilteredProducts(
    filters: productTypes.ActiveFilters,
    query: string,
  ): productTypes.Product[] {
    const matchedProducts: productTypes.Product[] = this._productList.filter(
      (product) => {
        if (filters.size && !filters.size.includes(product.size)) return false;
        if (filters.color && product.color !== filters.color) return false;
        if (filters.category && product.category !== filters.category)
          return false;
        if (filters.salesStatus && product.salesStatus !== filters.salesStatus)
          return false;
        if (
          query &&
          !product.name.toLowerCase().includes(query.trim().toLowerCase())
        )
          return false;
        return true;
      },
    );
    const seenGroups = new Set();
    return matchedProducts.filter((product) => {
      if (!seenGroups.has(product.groupId)) {
        seenGroups.add(product.groupId);
        return true;
      }
      return false;
    });
  }

  private sortProducts(
    products: productTypes.Product[],
    sortOption: productTypes.SortOptions,
  ) {
    switch (sortOption) {
      case "priceAsc":
        return [...products].sort((a, b) => a.price - b.price);

      case "priceDesc":
        return [...products].sort((a, b) => b.price - a.price);

      case "popularity":
        return [...products].sort((a, b) => b.popularity - a.popularity);

      case "rating":
        return [...products].sort((a, b) => b.rating - a.rating);

      default:
        return products;
    }
  }

  getCatalogProducts(
    filters: productTypes.ActiveFilters,
    sortOption: productTypes.SortOptions,
    query: string,
  ): productTypes.Product[] {
    this._catalogProducts = this.sortProducts(
      this.getFilteredProducts(filters, query),
      sortOption,
    );
    state.setAllPages(this.getAllPages());
    state.setProductsCount(this._catalogProducts.length);
    return this._catalogProducts;
  }

  getResultsPerPage(page: number = state.currentPage) {
    const start = (page - 1) * RESULTS_PER_PAGE;
    const end = page * RESULTS_PER_PAGE;

    return this._catalogProducts.slice(start, end);
  }

  private getAllPages(): number[] {
    const numOfAllPages = Math.ceil(
      this._catalogProducts.length / RESULTS_PER_PAGE,
    );
    return Array.from({ length: numOfAllPages }, (_, index) => index + 1);
  }

  getProductById(id: string): productTypes.Product | undefined {
    for (const product of this._productList) {
      if (product.id === id) {
        return product;
      }
    }
  }

  private getProductGroup(groupId: string): productTypes.Product[] {
    return this._productList.filter((obj) => {
      if (groupId === obj.groupId) return obj;
    });
  }

  getAvailableSizes(
    product: productTypes.Product | undefined,
  ): string[] | undefined {
    if (!product) return;
    const productGroup = this.getProductGroup(product.groupId);
    if (!productGroup || productGroup.length === 1) return [product.size];
    const sizes: Set<string> = new Set();
    productGroup.forEach((obj) => {
      sizes.add(obj.size);
    });
    return [...sizes];
  }

  getAvailableColors(
    product: productTypes.Product | undefined,
  ): string[] | undefined {
    if (!product) return;
    const productGroup = this.getProductGroup(product.groupId);
    if (!productGroup || productGroup.length === 1) return [product.color];
    const colors: Set<string> = new Set();
    productGroup.forEach((obj) => {
      colors.add(obj.color);
    });
    return [...colors];
  }

  getNewSizeColorComboProductId(
    groupId: string,
    size: string,
    color: string,
    selectedByUser: string,
  ): string {
    const products = this.getProductGroup(groupId);
    let matchedProduct = products.find(
      (product) => product.size === size && product.color === color,
    );
    if (!matchedProduct) {
      switch (selectedByUser) {
        case "size":
          matchedProduct = products.find((product) => product.size === size);
          break;
        case "color":
          matchedProduct = products.find((product) => product.color === color);
          break;
        default:
          matchedProduct = products.find((product) => product.isDefault);
      }
    }
    return (matchedProduct as productTypes.Product).id;
  }
}
