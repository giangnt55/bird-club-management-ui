import { BaseDto } from './base.model';

export interface Event extends BaseDto {
  event_name: string;
  cover_image: string;
  description: string;
  max_participants: number;
  min_participants: number;
  start_date: Date;
  end_date: Date;
  location: string;
  prerequisite: string;
  total_participants: number;
  total_feedback: number;
  average_rating: number;
  is_joined: boolean;
}

export enum EventType {
  Competition = 1,
  Entertainment = 2,
}

export enum EventStatus {
  UpComing = 1,
  Happening = 2,
  Cancelled = 3,
  Ending = 4,
}

export interface EventCreateDto extends BaseDto {
  event_name: string;
  status: EventStatus;
  type: EventType;
  cover_image: string;
  description: string;
  max_participants: number;
  min_participants: number;
  start_date: Date;
  end_date: Date;
  location: string;
  prerequisite: string;
  evaluation_strategy: string;
}

export interface EventDetailDto extends BaseDto {
  event_name: string;
  status: EventStatus;
  type: EventType;
  cover_image: string;
  description: string;
  max_participants: number;
  min_participants: number;
  start_date: Date;
  end_date: Date;
  location: string;
  prerequisite: string;
  evaluation_strategy: string;
}
