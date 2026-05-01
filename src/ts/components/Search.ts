import { state } from "../state";

export class Search {
  private readonly _searchField: HTMLInputElement;

  constructor() {
    this._searchField = document.getElementById(
      "searchField",
    ) as HTMLInputElement;
  }

  attachEventListener() {
    this._searchField.addEventListener("input", (e) => {
      state.setSearchQuery((e.target as HTMLInputElement).value);
    });
  }
}
