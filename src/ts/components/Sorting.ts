import { state } from "../state";
import { SortOptions } from "../product";

export class Sorting {
  private _sortSelector: HTMLSelectElement;

  constructor() {
    this._sortSelector = document.getElementById(
      "sortField",
    ) as HTMLSelectElement;
    this.init();
  }

  private init() {
    this._sortSelector.addEventListener("change", (e) => {
      state.setSorting((e.target as HTMLSelectElement).value as SortOptions);
    });
  }
}
