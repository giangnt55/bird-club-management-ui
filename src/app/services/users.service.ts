import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../environments/environment';
import { Observable, map } from 'rxjs';
import { AccountInfor, User } from '../models/user.model';
import { BaseResponse } from '../models/auth.model';
import { PaginationResponse } from '../models/paging.model';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private httpClient: HttpClient, private toastr: ToastrService) {}

  private apiUrl: string = environment.apiUrl;
  GET_ACCOUNT_INFO_URL = `${this.apiUrl}/user/account-infor`;
  GET_SUGGESTION_LIST = `${this.apiUrl}/user/suggestion`;
  GET_USER_INFOR = `${this.apiUrl}/user`;

  getAccountInfo(): Observable<AccountInfor> {
    return this.httpClient
      .get<BaseResponse<AccountInfor>>(this.GET_ACCOUNT_INFO_URL)
      .pipe(
        map((response: BaseResponse<AccountInfor>) => {
          return response.data;
        })
      );
  }

  getSuggestionFollow(): Observable<any> {
    return this.httpClient
      .get<PaginationResponse<User>>(this.GET_SUGGESTION_LIST)
      .pipe(
        map((response: PaginationResponse<User>) => {
          return response;
        })
      );
  }

  getUserInfor(username: string): Observable<any> {
    return this.httpClient
      .get<BaseResponse<User>>(`${this.GET_USER_INFOR}/${username}`)
      .pipe(
        map((response: BaseResponse<User>) => {
          return response;
        })
      );
  }

  getMembers() : Observable<any> {
    return this.httpClient
      .get<PaginationResponse<User>>(this.GET_USER_INFOR)
      .pipe(
        map((response: PaginationResponse<User>) => {
          return response;
          console.log("case 2: " + response);
        })
      );
  }

  getMemberById(id: string): Observable<any> {
    return this.httpClient
      .get<BaseResponse<User>>(`${this.GET_USER_INFOR}/${id}`)
      .pipe(
        map((response: BaseResponse<User>) => {
          return response;
        })
      );
  }

  searchMembers(query: string): Observable<any> {
    const params = new HttpParams().set('Keyword', query);

    return this.httpClient
      .get<BaseResponse<User>>(this.GET_USER_INFOR, { params })
      .pipe(
        map((response: BaseResponse<User>) => {
          console.log("Search Response:", response);
          return response;
        })
      );
  }

}
