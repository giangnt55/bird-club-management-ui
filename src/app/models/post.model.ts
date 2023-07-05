import { BaseDto } from './base.model';
import { DetailComment } from './comment.model';

export interface Post extends BaseDto {
  image: string;
  title: string;
  content: string;
  is_liked: boolean;
  total_like: number;
  total_comment: number;
}

export interface DetailPost extends BaseDto {
  image: string;
  title: string;
  content: string;
  is_liked: boolean;
  total_like: number;
  total_comment: number;
  comments: DetailComment[];
}

export interface PostCreateDto {
  image: string;
  title: string;
  content: string;
}
