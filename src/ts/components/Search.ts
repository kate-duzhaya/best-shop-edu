import { state } from "../state";

export class Search {
  private _searchField: HTMLInputElement;

  constructor() {
    this._searchField = document.getElementById(
      "searchField",
    ) as HTMLInputElement;
    this.init();
  }

  private init() {
    this._searchField.addEventListener("input", (e) => {
      state.setSearchQuery((e.target as HTMLInputElement).value);
    });
  }
}
