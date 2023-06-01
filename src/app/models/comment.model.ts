import { BaseDto } from './base.model';

export interface Comment extends BaseDto {
  text: string;
  author: string;
  date: Date;
}
