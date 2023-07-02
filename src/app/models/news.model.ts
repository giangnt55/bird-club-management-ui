import { BaseDto } from './base.model';

export interface News extends BaseDto {
  title: string;
  type: number;
  content: string;
  cover_image: string;
}
