import { BaseDto } from './base.model';

export interface CommentCreate {
  content: string;
  post_id: string | null;
  reply_to: string | null;
}

export interface Comment extends BaseDto {
  content: string;
  reply_to: string;
  post_id: string;
  is_liked: boolean;
  total_like: number;
  total_reply: number;
}

export interface DetailComment extends BaseDto {
  content: string;
  reply_to: string;
  post_id: string;
  is_liked: boolean;
  total_like: number;
  total_reply: number;
  replies: DetailComment[];
}
