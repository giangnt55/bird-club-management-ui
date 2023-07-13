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
  introduction: string;
}

export interface User extends BaseDto {
  fullname: string;
  introduction: string;
  avatar: string;
  role: number;
  status: number;
  email: string;
  phone_number: string;
  address: string;
  username: string;
  total_following: number;
  total_follower: number;
  total_post: number;
  is_followed_by_logged_in_user: boolean;
  is_following_logged_in_user: boolean;
}

export interface UserUpdate {
  fullname: string;
  avatar: string;
  role: number;
  status: number;
  email: string;
  phone_number: string;
  address: string;
  introduction: string;
}
