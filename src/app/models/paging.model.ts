export interface PaginationResponse<T> {
  total_count: number;
  total_pages: number | any;
  offset: number;
  page_size: number;
  data: T[];
}

export interface BasePaginationParam {
  id: string | null;
  create_at_from: number | null;
  page: number | null;
  page_size: number | null;
  order_by: string | null;
}
