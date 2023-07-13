import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Observable, map } from 'rxjs';
import { ReportCreateDto } from '../models/report.model';
import { NoDataResponse } from '../models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  private apiUrl: string = environment.apiUrl;
  BASE_URL = `${this.apiUrl}/report`;
  constructor(private httpClient: HttpClient, private toastr: ToastrService) {}

  report(report: ReportCreateDto): Observable<any> {
    return this.httpClient
      .post<NoDataResponse>(`${this.BASE_URL}`, report)
      .pipe(
        map((response: NoDataResponse) => {
          return response;
        })
      );
  }

  // cancelReport(report: ReportCreateDto): Observable<any> {
  //   return this.httpClient
  //     .delete<NoDataResponse>(`${this.BASE_URL}`, report )
  //     .pipe(
  //       map((response: NoDataResponse) => {
  //         return response;
  //       })
  //     );
  // }
}
