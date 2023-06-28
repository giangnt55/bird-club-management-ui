export interface UserLogin {
  access_token: string;
  refresh_token: string;
  access_expired_at: string;
  refresh_expired_at: string;
  email: string;
  fullname: string;
  role: number;
  user_id: string;
  is_first_login: boolean;
}

export interface LoginResponse {
  access_token: string;
  refresh_token: string;
  access_expired_at: string;
  refresh_expired_at: string;
  email: string;
  fullname: string;
  role: number;
  user_id: string;
  is_first_login: boolean;
}

export interface BaseResponse<T> {
  status_code: number;
  message: string;
  data: T;
}

export interface NoDataResponse {
  status_code: number;
  message: string;
}
