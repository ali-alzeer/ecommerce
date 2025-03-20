export interface ProductsFilter {
  CategoryId: number | null;
  Search: string | null;
  MinPrice: number | null;
  MaxPrice: number | null;
  MinRating: number | null;
  MaxRating: number | null;
  PageNumber: number | null;
  PageSize: number | null;
}
