export interface PaginationResponse<T> {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
  data: T[];
}

export interface BasePaginationParam {
  id: string | null;
  create_at_from: number | null;
  page: number | null;
  page_size: number | null;
  order_by: string | null;
}
