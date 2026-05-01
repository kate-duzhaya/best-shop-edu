import { state } from "../state";
import { SortOptions } from "../product";

export class Sorting {
  private readonly _sortSelector: HTMLSelectElement;

  constructor() {
    this._sortSelector = document.getElementById(
      "sortField",
    ) as HTMLSelectElement;
  }

  attachEventListener() {
    this._sortSelector.addEventListener("change", (e) => {
      state.setSorting((e.target as HTMLSelectElement).value as SortOptions);
    });
  }
}
