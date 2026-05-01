import { state } from "../state";
import { RESULTS_PER_PAGE } from "../config";

export class CatalogPages {
  private _paginationEl: HTMLDivElement;
  private _pagesArray: number[] = [];

  constructor() {
    this._paginationEl = document.querySelector(
      ".catalog-grid__pages-wrapper",
    ) as HTMLDivElement;
    this.init();
  }

  private init() {
    this.showPages();
    this.showNextBtn();
    this.showPreviousBtn();
    this.displayNumOfResults();
  }

  private showPages(pagesArray: number[] = state.allPages) {
    this._pagesArray = pagesArray;

    if (!this._pagesArray || this._pagesArray.length === 0) {
      this._paginationEl.classList.add("u-hidden");
      return;
    }
    this._paginationEl.innerHTML = "";
    this._paginationEl.classList.remove("u-hidden");

    const pagesDiv = document.createElement("div") as HTMLDivElement;
    pagesDiv.classList.add("catalog-grid__pages");

    for (const page of this._pagesArray.values()) {
      const pageBtn = document.createElement("button");
      pageBtn.classList.add("catalog-grid__page", "btn", "btn--page");
      pageBtn.value = `${page}`;
      pageBtn.textContent = `${page}`;
      if (page === state.currentPage) {
        pageBtn.classList.add("current-page");
      }
      pagesDiv.append(pageBtn);
    }

    this._paginationEl.append(pagesDiv);

    pagesDiv.addEventListener("click", (e) => {
      const selectedPage = Number((e.target as HTMLButtonElement).value);
      if (state.currentPage === selectedPage) return;
      state.setCurrentPage(selectedPage);
      this.scrollAfterPageChange();
    });
  }

  private showNextBtn(): HTMLButtonElement {
    const nextBtn = document.createElement("button") as HTMLButtonElement;
    if (
      this._pagesArray.length > 1 &&
      state.currentPage !== this._pagesArray[this._pagesArray.length - 1]
    ) {
      nextBtn.classList.add("catalog-grid__next", "btn", "btn--secondary");
      nextBtn.textContent = "Next";
      this._paginationEl.append(nextBtn);

      nextBtn.addEventListener("click", () => {
        state.setCurrentPage(state.currentPage + 1);
        this.scrollAfterPageChange();
      });
    }
    return nextBtn;
  }

  private showPreviousBtn(): HTMLButtonElement {
    const previousBtn = document.createElement("button") as HTMLButtonElement;
    if (this._pagesArray.length > 1 && state.currentPage !== 1) {
      previousBtn.classList.add(
        "catalog-grid__previous",
        "btn",
        "btn--secondary",
      );
      previousBtn.textContent = "Previous";
      this._paginationEl.append(previousBtn);

      previousBtn.addEventListener("click", () => {
        state.setCurrentPage(state.currentPage - 1);
        this.scrollAfterPageChange();
      });
    }
    return previousBtn;
  }

  private displayNumOfResults() {
    const textLine: HTMLParagraphElement = document.querySelector(
      ".catalog-header__number-line",
    ) as HTMLParagraphElement;

    textLine.textContent = "";

    if (state.productsCount === 0) return;

    const firstEl =
      state.currentPage === 1
        ? 1
        : RESULTS_PER_PAGE * (state.currentPage - 1) + 1;
    const lastEl = Math.min(
      state.currentPage * RESULTS_PER_PAGE,
      state.productsCount,
    );
    textLine.textContent = `Showing ${firstEl}-${lastEl} of ${state.productsCount} results`;
  }

  private scrollAfterPageChange() {
    window.scrollTo(0, 0);
  }
}
