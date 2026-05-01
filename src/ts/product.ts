export interface Product {
  id: string;
  groupId: string;
  name: string;
  isDefault: boolean;
  price: number;
  imageUrl: string;
  category: string;
  color: string;
  size: string;
  salesStatus: boolean;
  rating: number;
  popularity: number;
  blocks: string[];
}

export interface ProductToCart {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  color: string;
  size: string;
  salesStatus: boolean;
  quantity: number;
  total: number;
}

export type SectionType = "selected" | "new" | "youMaylike" | "bestSets";

export interface ActiveFilters {
  size?: string[] | null;
  color?: string | null;
  category?: string | null;
  salesStatus?: boolean | null;
}

export type SortOptions =
  | "priceAsc"
  | "priceDesc"
  | "popularity"
  | "rating"
  | "";
