import { BasePaginationParam } from './paging.model';

export interface DashboardDto {
  total_member: number;
  total_new_member: number;
  total_event: number;
  total_post: number;
}

export interface AdminPagingParam extends BasePaginationParam {
  keyword: string | null;
}
