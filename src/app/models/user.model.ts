import { BaseDto } from './base.model';

export interface AccountInfor extends BaseDto {
  fullname: string;
  avatar: string;
  role: number;
  status: number;
  email: string;
  phone_number: string;
  address: string;
  username: string;
}
