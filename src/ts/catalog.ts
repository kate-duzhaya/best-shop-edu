import { ProductService } from "./ProductService";
import { renderProducts } from "./components/ProductCard";
import { ActiveFilters, Product, SortOptions } from "./product";
import { state } from "./state";
import { Filters } from "./components/Filters";
import { Sorting } from "./components/Sorting";
import { Search } from "./components/Search";
import { CatalogPages } from "./components/CatalogPages";

const productService = new ProductService();

const showEmptyMessage = (parentEl: HTMLDivElement): void => {
  parentEl.innerHTML = "";
  const messageEl = document.createElement("p");
  messageEl.textContent =
    "😔 Sorry, there are no products matching the criteria";
  messageEl.classList.add("empty-message");
  parentEl.classList.add("catalog-grid__products--empty");
  parentEl.append(messageEl);
};

const renderCatalogProducts = (): void => {
  const currentFilters: ActiveFilters = state.filters;
  const currentSorting: SortOptions = state.sorting;
  const currentSearchQuery: string = state.search;
  const currrentPage: number = state.currentPage;

  productService.getCatalogProducts(
    currentFilters,
    currentSorting,
    currentSearchQuery,
  );

  new CatalogPages();

  const productsToDisplay: Product[] =
    productService.getResultsPerPage(currrentPage);

  const catalogElement: HTMLDivElement = document.querySelector(
    ".catalog-grid__product-list",
  ) as HTMLDivElement;

  if (
    catalogElement &&
    (!productsToDisplay ||
      (Array.isArray(productsToDisplay) && productsToDisplay.length === 0))
  ) {
    showEmptyMessage(catalogElement);
  } else {
    catalogElement.classList.remove("catalog-grid__products--empty");
    renderProducts(productsToDisplay, catalogElement);
  }
};

export const initCatalog = () => {
  const products = new ProductService();
  new Filters();
  new Sorting();
  new Search();

  renderCatalogProducts();
  state.subscribe(renderCatalogProducts);

  const bestSetsSection: HTMLDivElement | null = document.querySelector(
    ".catalog-grid__sets-list",
  );
  const bestSets = products.getRandomSets();

  renderProducts(bestSets, bestSetsSection, "bestSets");
};
