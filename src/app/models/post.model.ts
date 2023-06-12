import { BaseDto } from './base.model';

export interface Post extends BaseDto {
  image: string;
  title: string;
  content: string;
  total_like: number;
  total_comment: number;
}
