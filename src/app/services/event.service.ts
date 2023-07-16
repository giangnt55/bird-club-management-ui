import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Observable, map } from 'rxjs';
import { BaseResponse } from '../models/auth.model';
import { Event, EventCreateDto, EventDetailDto } from '../models/event.model';
import {
  BasePaginationParam,
  PaginationResponse,
} from '../models/paging.model';
import { AdminPagingParam } from '../models/dashboard.model';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private apiUrl: string = environment.apiUrl;
  GET_URL = `${this.apiUrl}/event`;

  constructor(private httpClient: HttpClient, private toastr: ToastrService) {}

  getEvents(paging: AdminPagingParam): Observable<any> {
    let params = new HttpParams();

    if (paging.keyword !== null) {
      params = params.set('keyword', paging.keyword);
    }

    if (paging.page !== null) {
      params = params.set('page', paging.page);
    }

    if (paging.page_size !== null) {
      params = params.set('page_size', paging.page_size);
    }

    if (paging.order_by !== null) {
      params = params.set('order_by', paging.order_by);
    }

    return this.httpClient
      .get<PaginationResponse<Event>>(`${this.GET_URL}`, { params })
      .pipe(map((response: PaginationResponse<Event>) => response));
  }

  insertEvent(eventDto: EventCreateDto): Observable<any> {
    const url = `${this.apiUrl}/events`;
    return this.httpClient.post<BaseResponse<EventDetailDto>>(url, eventDto);
  }

  getEvent(id: string): Observable<any> {
    const url = `${this.GET_URL}/${id}`;
    return this.httpClient.get<BaseResponse<EventDetailDto>>(url).pipe(
      map((response: BaseResponse<EventDetailDto>) => {
        return response.data;
      })
    );
  }

  // updateEvent(id: string, eventUpdateDto: EventUpdateDto): Observable<any> {
  //   const url = `${this.apiUrl}/events/${id}`;
  //   return this.httpClient.put<ApiResponse<EventDetailDto>>(url, eventUpdateDto);
  // }

  // deleteEvent(id: string): Observable<any> {
  //   const url = `${this.apiUrl}/events/${id}`;
  //   return this.httpClient.delete<ApiResponse>(url);
  // }
}
