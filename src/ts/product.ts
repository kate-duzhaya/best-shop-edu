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

// export const searchKey: Record<SectionType, string> = {
//   selected: "Selected Products",
//   new: "New Products Arrival",
//   youMaylike: "You May Also Like",
//   bestSets: "luggage sets",
// };

// export type FilterType = "size" | "color" | "category" | "sale";

// type SizeType = "S" | "M" | "L" | "XL" | "S-L" | "S, M, XL";

// type CategoryType =
//   | "carry-ons"
//   | "suitcases"
//   | "luggage sets"
//   | "kids' luggage";

// type ColorType =
//   | "red"
//   | "blue"
//   | "green"
//   | "black"
//   | "grey"
//   | "yellow"
//   | "pink"
//   | "beige"
//   | "orange"
//   | "brown"
//   | "white";

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
