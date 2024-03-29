import { Injectable } from '@angular/core';
import { environment } from 'src/app/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { DetailPost, Post, PostCreateDto } from 'src/app/models/post.model';
import {
  BasePaginationParam,
  PaginationResponse,
} from 'src/app/models/paging.model';
import { map } from 'rxjs/operators';
import { BaseResponse, NoDataResponse } from '../models/auth.model';
import { AdminPagingParam } from '../models/dashboard.model';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private apiUrl: string = environment.apiUrl;
  GET_POST_URL = `${this.apiUrl}/post`;
  GET_OWN_POST_URL = `${this.apiUrl}/post/own`;
  CREATE_POST_URL = `${this.apiUrl}/post`;

  constructor(private httpClient: HttpClient, private toastr: ToastrService) {}

  getPosts(paging: AdminPagingParam): Observable<any> {
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
      .get<PaginationResponse<Post>>(this.GET_POST_URL, { params })
      .pipe(
        map((response: PaginationResponse<Post>) => {
          return response;
        })
      );
  }

  getOwnPosts(): Observable<any> {
    return this.httpClient
      .get<PaginationResponse<Post>>(this.GET_OWN_POST_URL)
      .pipe(
        map((response: PaginationResponse<Post>) => {
          return response.data;
        })
      );
  }

  getPostsByUsername(username: string): Observable<any> {
    return this.httpClient
      .get<BaseResponse<Post>>(`${this.GET_POST_URL}/${username}`)
      .pipe(
        map((response: BaseResponse<Post>) => {
          return response.data;
        })
      );
  }

  getPost(postId: string): Observable<any> {
    return this.httpClient
      .get<BaseResponse<DetailPost>>(`${this.GET_POST_URL}/${postId}`)
      .pipe(
        map((response: BaseResponse<DetailPost>) => {
          return response.data;
        })
      );
  }

  deletePost(postId: string): Observable<any> {
    return this.httpClient
      .delete<NoDataResponse>(`${this.GET_POST_URL}/${postId}`)
      .pipe(
        map((response: NoDataResponse) => {
          return response;
        })
      );
  }

  createPost(post: PostCreateDto): Observable<any> {
    const body = {
      title: post.title,
      content: post.content,
      image: post.image,
    };

    return this.httpClient
      .post<PaginationResponse<Post>>(this.CREATE_POST_URL, body)
      .pipe(
        map((response: PaginationResponse<Post>) => {
          return response;
        })
      );
  }
}
