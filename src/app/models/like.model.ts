import { BaseDto } from './base.model';

export interface LikeCreateDto {
  post_id: string | null;
  comment_id: string | null;
}

export interface Like extends BaseDto {}
