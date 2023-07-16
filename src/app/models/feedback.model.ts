import { BaseDto } from './base.model';
import { BasePaginationParam } from './paging.model';

export interface Feedback extends BaseDto {
  participant_id: string;
  event_id: string;
  content: string;
  rating: number;
}

export interface FeedbackParam extends BasePaginationParam {
  content: string | null;
  event_id: string | null;
}

export interface FeedbackCreateDto {
  event_id: string;
  content: string;
  rating: number;
}
