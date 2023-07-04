import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/app/environments/environment';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs/operators';
import { BaseResponse, LoginResponse } from '../models/auth.model';
import { Response } from '../models/response.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl: string = environment.apiUrl;
  constructor(private httpClient: HttpClient, private toastr: ToastrService) {}

  LOGIN_URL = `${this.apiUrl}/auth/sign-in`;
  REFRESH_TOKEN_URL = `${this.apiUrl}/auth/refresh-token`;
  LOGOUT_URL = `${this.apiUrl}/auth/sign-out`;

  login(
    username: string,
    password: string
  ): Observable<Response<LoginResponse>> {
    const loginData = {
      username: username,
      password: password,
    };

    return this.httpClient
      .post<Response<LoginResponse>>(this.LOGIN_URL, loginData)
      .pipe(
        catchError((error) => {
          throw error; // Rethrow the error to propagate it to the component
        })
      );
  }

  logout(): Observable<any> {
    return this.httpClient.post<any>(this.LOGOUT_URL, {}).pipe(
      catchError((error) => {
        throw error;
      })
    );
  }
  // // Add more authentication-related methods as needed
}
