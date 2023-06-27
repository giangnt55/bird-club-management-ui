import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { BaseResponse, NoDataResponse } from '../models/auth.model';
import { CommentCreate, DetailComment } from '../models/comment.model';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private apiUrl: string = environment.apiUrl;
  GET_URL = `${this.apiUrl}/comment`;
  CREATE_URL = `${this.apiUrl}/comment`;
  DELETE_URL = `${this.apiUrl}/comment`;

  constructor(private httpClient: HttpClient, private toastr: ToastrService) {}

  comment(comment: CommentCreate): Observable<any> {
    return this.httpClient
      .post<NoDataResponse>(`${this.CREATE_URL}`, comment)
      .pipe(
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

  getCommentByPostId(postId: string): Observable<any> {
    return this.httpClient
      .get<BaseResponse<DetailComment>>(`${this.GET_URL}/post/${postId}`)
      .pipe(
        map((response: BaseResponse<DetailComment>) => {
          return response.data;
        })
      );
  }
}
