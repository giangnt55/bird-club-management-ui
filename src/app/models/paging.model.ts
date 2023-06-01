export interface PaginationResponse<T> {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
  items: T[];
}
