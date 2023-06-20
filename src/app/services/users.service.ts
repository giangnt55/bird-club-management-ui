import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../environments/environment';
import { Observable, map } from 'rxjs';
import { AccountInfor } from '../models/user.model';
import { BaseResponse } from '../models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private httpClient: HttpClient, private toastr: ToastrService) {}

  private apiUrl: string = environment.apiUrl;
  GET_ACCOUNT_INFO_URL = `${this.apiUrl}/user/account-infor`;

  getAccountInfo(): Observable<AccountInfor> {
    return this.httpClient
      .get<BaseResponse<AccountInfor>>(this.GET_ACCOUNT_INFO_URL)
      .pipe(
        map((response: BaseResponse<AccountInfor>) => {
          return response.data;
        })
      );
  }
}
