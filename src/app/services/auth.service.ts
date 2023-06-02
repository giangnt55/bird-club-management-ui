import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LOGIN_RES } from '../models/auth.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  LOGIN_URL = `http://localhost:5400/api/v1/auth/sign-in`;
  REFRESH_TOKEN_URL = `http://localhost:5400/api/v1/auth/refresh-token`;
  LOGOUT_URL = `http://localhost:5400/api/v1/auth/sign-out`;

  login(username: string, password: string): Observable<any> {
    //const loginUrl = `${this.apiUrl}/auth/login`;

    const loginData = {
      username: username,
      password: password,
    };

    return this.httpClient.post(this.LOGIN_URL, loginData);
  }

  // Add more authentication-related methods as needed
}
