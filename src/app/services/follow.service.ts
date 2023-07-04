import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import {
  CreateFollowDto,
  FollowPaginationParam,
  Follower,
  Following,
} from '../models/follow.model';
import { Observable, map } from 'rxjs';
import { PaginationResponse } from '../models/paging.model';
import { BaseResponse, NoDataResponse } from '../models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class FollowService {
  private apiUrl: string = environment.apiUrl;
  BASE_URL = `${this.apiUrl}/follower`;

  constructor(private httpClient: HttpClient) {}

  getFollowers(paging: FollowPaginationParam): Observable<any> {
    let params = new HttpParams();

    if (paging.follow_to !== null) {
      params = params.set('follow_to', paging.follow_to);
    }

    if (paging.creator_id !== null) {
      params = params.set('creator_id', paging.creator_id);
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
      .get<PaginationResponse<Follower>>(`${this.BASE_URL}/followed`, {
        params,
      })
      .pipe(
        map((response: PaginationResponse<Follower>) => {
          return response;
        })
      );
  }

  getFollowings(paging: FollowPaginationParam): Observable<any> {
    let params = new HttpParams();

    if (paging.follow_to !== null) {
      params = params.set('follow_to', paging.follow_to);
    }

    if (paging.creator_id !== null) {
      params = params.set('creator_id', paging.creator_id);
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
      .get<PaginationResponse<Following>>(`${this.BASE_URL}/follow`, {
        params,
      })
      .pipe(
        map((response: PaginationResponse<Following>) => {
          return response;
        })
      );
  }

  create(follow: CreateFollowDto): Observable<any> {
    return this.httpClient.post<NoDataResponse>(this.BASE_URL, follow).pipe(
      map((response: NoDataResponse) => {
        return response;
      })
    );
  }
}
