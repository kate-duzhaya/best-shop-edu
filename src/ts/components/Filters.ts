import { ActiveFilters } from "../product";
import { state } from "../state";

const customSizes: Partial<Record<string, NonNullable<ActiveFilters["size"]>>> =
  {
    "S-L": ["S", "M", "L"],
  };

export class Filters {
  private readonly _formElement: HTMLFormElement;
  private readonly _sizeFilter: HTMLSelectElement;
  private readonly _colorFilter: HTMLSelectElement;
  private readonly _categoryFilter: HTMLSelectElement;
  private readonly _isOnSaleFilter: HTMLInputElement;
  private readonly _formFields: (HTMLSelectElement | HTMLInputElement)[];

  constructor() {
    this._formElement = document.getElementById(
      "filterProductsForm",
    ) as HTMLFormElement;
    this._sizeFilter = document.getElementById(
      "filterSizeField",
    ) as HTMLSelectElement;
    this._colorFilter = document.getElementById(
      "filterColorField",
    ) as HTMLSelectElement;
    this._categoryFilter = document.getElementById(
      "filterCategoryField",
    ) as HTMLSelectElement;
    this._isOnSaleFilter = document.getElementById(
      "filterIsOnSale",
    ) as HTMLInputElement;
    this._formFields = [
      this._sizeFilter,
      this._colorFilter,
      this._categoryFilter,
      this._isOnSaleFilter,
    ];
  }

  attachEventListeners() {
    const openFiltersBtn: HTMLButtonElement = document.querySelector(
      ".catalog-header__filter",
    ) as HTMLButtonElement;

    openFiltersBtn.addEventListener("mouseover", () => {
      this._formElement.classList.toggle("is-open");

      if (this._formElement.classList.contains("is-open")) {
        const hideFiltersBtn: HTMLButtonElement = document.getElementById(
          "hideFiltersButton",
        ) as HTMLButtonElement;
        hideFiltersBtn.addEventListener("click", (e) => {
          e.preventDefault();
          this.closeFilters();
        });
        this._formElement.addEventListener("mouseleave", () => {
          this.closeFilters();
        });
      }
    });

    const resetFiltersBtn = document.getElementById(
      "clearFiltersBtn",
    ) as HTMLButtonElement;

    this._formFields.forEach((filter) => {
      filter.addEventListener("change", (e) => {
        switch (filter.name) {
          case "size":
            if (this._sizeFilter.value === "") {
              state.setFilter("size", null);
              break;
            }
            state.setFilter(
              "size",
              customSizes[(e.target as HTMLSelectElement).value] || [
                (e.target as HTMLSelectElement).value,
              ],
            );
            break;
          case "color":
          case "category":
            state.setFilter(filter.name, (e.target as HTMLSelectElement).value);
            break;
          case "salesStatus":
            state.setFilter(
              "salesStatus",
              (e.target as HTMLInputElement).checked,
            );
            break;
        }
        this.highlightSelectedFilters();
      });
    });

    resetFiltersBtn.addEventListener("click", () => {
      state.resetFilters();
      this.highlightSelectedFilters();
    });
  }

  private closeFilters() {
    this._formElement.classList.remove("is-open");
  }

  private highlightSelectedFilters() {
    const currentFilters = state.filters;

    this._formFields.forEach((field) => {
      if (field.name === "salesStatus") return;

      const stateValue =
        currentFilters[field.name as keyof typeof currentFilters];
      const isActive =
        stateValue !== null &&
        stateValue !== undefined &&
        stateValue !== "" &&
        (typeof stateValue === "boolean"
          ? stateValue === true
          : stateValue.length > 0);

      if (isActive) {
        field.classList.add("input-field--selected-filter");
      } else {
        field.classList.remove("input-field--selected-filter");
      }
    });
  }
}
