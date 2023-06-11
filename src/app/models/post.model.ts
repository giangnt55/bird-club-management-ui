import { BaseDto } from './base.model';

export interface Post extends BaseDto {
  imageUrl: string;
  title: string;
  description: string;
  likeCount: number;
}
