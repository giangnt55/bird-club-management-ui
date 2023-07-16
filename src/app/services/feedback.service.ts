import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import {
  Feedback,
  FeedbackCreateDto,
  FeedbackParam,
} from '../models/feedback.model';
import { Observable, catchError, map, throwError } from 'rxjs';
import { PaginationResponse } from '../models/paging.model';
import { NoDataResponse } from '../models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class FeedbackService {
  private apiUrl: string = environment.apiUrl;
  GET_URL = `${this.apiUrl}/feedback`;

  constructor(private httpClient: HttpClient, private toastr: ToastrService) {}

  gets(paging: FeedbackParam): Observable<any> {
    let params = new HttpParams();

    if (paging.event_id !== null) {
      params = params.set('event_id', paging.event_id);
    }

    if (paging.content !== null) {
      params = params.set('content', paging.content);
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
      .get<PaginationResponse<Feedback>>(`${this.GET_URL}`, { params })
      .pipe(map((response: PaginationResponse<Feedback>) => response));
  }

  feedback(feedback: FeedbackCreateDto): Observable<any> {
    const body = {
      event_id: feedback.event_id,
      content: feedback.content,
      rating: Number(feedback.rating), // Convert the rating to a number
    };

    return this.httpClient.post<NoDataResponse>(this.GET_URL, body).pipe(
      map((response: NoDataResponse) => {
        return response;
      }),
      catchError((error) => {
        // Handle the error here (e.g., show an error message)
        console.error('Error creating post:', error);
        return throwError(error);
      })
    );
  }
}
