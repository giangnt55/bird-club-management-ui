import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Observable, map } from 'rxjs';
import { PaginationResponse } from '../models/paging.model';
import { NoDataResponse } from '../models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class ParticipateService {
  private apiUrl: string = environment.apiUrl;
  BASE_URL = `${this.apiUrl}/participant`;
  //GET_OWN_POST_URL = `${this.apiUrl}/participant`;
  CREATE_POST_URL = `${this.apiUrl}/participant`;

  constructor(private httpClient: HttpClient, private toastr: ToastrService) {}

  joinEvent(event_id: string): Observable<any> {
    const body = {
      event_id: event_id,
    };

    return this.httpClient.post<NoDataResponse>(this.BASE_URL, body).pipe(
      map((response: NoDataResponse) => {
        return response;
      })
    );
  }

  outEvent(event_id: string): Observable<any> {
    return this.httpClient
      .delete<NoDataResponse>(`${this.BASE_URL}/${event_id}`)
      .pipe(
        map((response: NoDataResponse) => {
          return response;
        })
      );
  }
}
