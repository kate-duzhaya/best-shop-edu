import { ActiveFilters, SortOptions } from "./product";

type ListenerFunc = () => void;

interface State {
  filters: ActiveFilters;
  search: string;
  sorting: SortOptions;
  currentPage: number;
  allPages: number[];
  productsCount: number;

  listeners: ListenerFunc[];
  subscribe(func: ListenerFunc): void;
  setFilter<K extends keyof ActiveFilters>(
    type: K,
    value: ActiveFilters[K],
  ): void;
  resetFilters(): void;
  setSorting(sortOption: SortOptions): void;
  setSearchQuery(query: string): void;
  setCurrentPage(pageNum: number): void;
  setAllPages(pages: number[]): void;
  setProductsCount(count: number): void;
}

export const state: State = {
  filters: {},
  search: "",
  sorting: "",
  currentPage: 1,
  allPages: [],
  productsCount: 0,

  listeners: [],
  subscribe(func: ListenerFunc) {
    this.listeners.push(func);
  },
  setFilter<K extends keyof ActiveFilters>(
    type: K,
    value: ActiveFilters[K],
  ): void {
    this.filters[type] = value;
    this.currentPage = 1;
    this.listeners.forEach((listener) => listener());
  },
  resetFilters() {
    this.filters = {};
    this.currentPage = 1;
    this.listeners.forEach((listener) => listener());
  },
  setSorting(sortOption: SortOptions) {
    this.sorting = sortOption;
    this.currentPage = 1;
    this.listeners.forEach((listener) => listener());
  },
  setSearchQuery(query: string) {
    this.search = query;
    this.currentPage = 1;
    this.listeners.forEach((listener) => listener());
  },
  setCurrentPage(pageNum: number) {
    this.currentPage = pageNum;
    this.listeners.forEach((listener) => listener());
  },
  setAllPages(pages: number[]) {
    this.allPages = pages;
  },
  setProductsCount(count: number) {
    this.productsCount = count;
  },
};
