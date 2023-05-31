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
  
  export interface LOGIN_RES {
    status_code: number;
    message: string;
    data: UserLogin;
  }
  
  export interface LOGOUT_RES {
    status_code: number;
    message: string;
  }
  