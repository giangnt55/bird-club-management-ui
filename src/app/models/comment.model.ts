import { BaseDto } from './base.model';

export interface Comment extends BaseDto {
  content: string;
  reply_to: string;
  post_id: Date;
  total_like: number;
  total_reply: number;
}

export interface DetailComment extends BaseDto {
  content: string;
  reply_to: string;
  post_id: Date;
  total_like: number;
  total_reply: number;
  replies: Comment[];
}
