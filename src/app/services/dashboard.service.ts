import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { BaseResponse } from '../models/auth.model';
import { DashboardDto } from '../models/dashboard.model';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private apiUrl: string = environment.apiUrl;
  BASE_URL = `${this.apiUrl}/dashboard`;

  constructor(private httpClient: HttpClient) {}

  getDashboardInfor(): Observable<any> {
    return this.httpClient.get<BaseResponse<DashboardDto>>(this.BASE_URL).pipe(
      map((response: BaseResponse<DashboardDto>) => {
        return response;
      })
    );
  }
}
