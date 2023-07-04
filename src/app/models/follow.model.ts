import { BaseDto } from './base.model';
import { BasePaginationParam } from './paging.model';
import { AccountInfor } from './user.model';

export interface Follower extends BaseDto {
  follow_to: string;
  is_followed: boolean;
}

export interface Following extends BaseDto {
  follow_to: string;
  follow_to_user: AccountInfor;
}

export interface FollowPaginationParam extends BasePaginationParam {
  follow_to: string | null;
  creator_id: string | null;
}

export interface CreateFollowDto {
  follow_to: string | undefined;
}
