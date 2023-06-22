import { Injectable } from '@angular/core';
import { environment } from 'src/app/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { DetailPost, Post, PostCreateDto } from 'src/app/models/post.model';
import { PaginationResponse } from 'src/app/models/paging.model';
import { map } from 'rxjs/operators';
import { BaseResponse } from '../models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private apiUrl: string = environment.apiUrl;
  GET_POST_URL = `${this.apiUrl}/post`;
  GET_OWN_POST_URL = `${this.apiUrl}/post/own`;
  CREATE_POST_URL = `${this.apiUrl}/post`;

  constructor(private httpClient: HttpClient, private toastr: ToastrService) {}

  getPosts(): Observable<any> {
    return this.httpClient
      .get<PaginationResponse<Post>>(this.GET_POST_URL)
      .pipe(
        map((response: PaginationResponse<Post>) => {
          return response.data;
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

  getPost(postId: string): Observable<any> {
    return this.httpClient
      .get<BaseResponse<DetailPost>>(`${this.GET_POST_URL}/${postId}`)
      .pipe(
        map((response: BaseResponse<DetailPost>) => {
          return response.data;
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
