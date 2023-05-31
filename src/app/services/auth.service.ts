import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {LOGIN_RES, LOGOUT_RES} from '../models/auth.model';
@Injectable({
  providedIn: 'root',
})

export class AuthService {
  constructor(private httpClient: HttpClient) {}

  LOGIN_URL = `http://localhost:5400/api/v1/auth/sign-in`;
  REFRESH_TOKEN_URL = `http://localhost:5400/api/v1/auth/refresh-token`;
  LOGOUT_URL = `http://localhost:5400/api/v1/auth/sign-out`;

  login(username: string, password: string) {

    return this.httpClient.post<LOGIN_RES>(this.LOGIN_URL, {
      username,
      password,
    });
  }

  // Add more authentication-related methods as needed
}
