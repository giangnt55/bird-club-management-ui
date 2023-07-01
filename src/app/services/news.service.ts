import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Observable, map } from 'rxjs';
import {
  BasePaginationParam,
  PaginationResponse,
} from '../models/paging.model';
import { Post } from '../models/post.model';
import { News } from '../models/news.model';
import { BaseResponse } from '../models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  private apiUrl: string = environment.apiUrl;
  GET_URL = `${this.apiUrl}/news`;
  CREATE_URL = `${this.apiUrl}/news`;

  constructor(private httpClient: HttpClient, private toastr: ToastrService) {}

  getNews(): Observable<any> {
    // let params = new HttpParams();

    // if (paging.page !== null) {
    //   params = params.set('page', paging.page);
    // }

    // if (paging.page_size !== null) {
    //   params = params.set('page_size', paging.page_size);
    // }

    // if (paging.order_by !== null) {
    //   params = params.set('order_by', paging.order_by);
    // }

    return this.httpClient.get<BaseResponse<News>>(this.GET_URL).pipe(
      map((response: BaseResponse<News>) => {
        return response.data;
      })
    );
  }
}
