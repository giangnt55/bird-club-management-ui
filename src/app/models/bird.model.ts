import { BaseDto } from './base.model';

export enum Conservation {
  NotEvaluated = 1,
  DataDeficient = 2,
  LeastConcern = 3,
  NearThreatened = 4,
  Vulnerable = 5,
  Endangered = 6,
  CriticallyEndangered = 7,
  ExtinctInTheWild = 8,
  Extinct = 9,
}

export interface BirdDto extends BaseDto {
  name: string;
  image: string;
  description: string;
  habitat: string;
  avgLifeSpan: number;
  avgLifeSize: number;
  conservation: Conservation;
}
