import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Observable, map } from 'rxjs';
import { BaseResponse } from '../models/auth.model';
import { EventCreateDto, EventDetailDto } from '../models/event.model';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private apiUrl: string = environment.apiUrl;
  GET_URL = `${this.apiUrl}/events`;


  constructor(private httpClient: HttpClient, private toastr: ToastrService) {}

  getEvents(event: Event): Observable<any>{
    return this.httpClient.get<BaseResponse<Event>>(`${this.GET_URL}/events`,)
    .pipe(
      map((response: BaseResponse<Event>) => response.data),
    )
  }

  insertEvent(eventDto: EventCreateDto): Observable<any> {
    const url = `${this.apiUrl}/events`;
    return this.httpClient.post<BaseResponse<EventDetailDto>>(url, eventDto);
  }

  getEvent(id: string): Observable<any> {
    const url = `${this.apiUrl}/events/${id}`;
    return this.httpClient.get<BaseResponse<EventDetailDto>>(url)
    .pipe(
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
