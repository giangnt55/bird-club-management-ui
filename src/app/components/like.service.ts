import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Like, LikeCreateDto } from '../models/like.model';
import { Observable, catchError, map, throwError } from 'rxjs';
import { BaseResponse, NoDataResponse } from '../models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class LikeService {
  private apiUrl: string = environment.apiUrl;
  GET_URL = `${this.apiUrl}/like`;
  GET_LIKE_OF_POST_URL = `${this.apiUrl}/like/post`;
  CREATE_URL = `${this.apiUrl}/like`;
  DELETE_URL = `${this.apiUrl}/like`;

  constructor(private httpClient: HttpClient, private toastr: ToastrService) {}

  getLikesOfPost(postId: string): Observable<any> {
    return this.httpClient
      .get<BaseResponse<Like>>(`${this.GET_LIKE_OF_POST_URL}/${postId}`)
      .pipe(
        map((response: BaseResponse<Like>) => {
          return response.data;
        })
      );
  }

  likePost(like: LikeCreateDto): Observable<any> {
    const body = {
      post_id: like.post_id,
      comment_id: like.comment_id,
    };

    return this.httpClient.post<NoDataResponse>(this.CREATE_URL, body).pipe(
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

  unlikePost(like: LikeCreateDto): Observable<any> {
    const body = {
      post_id: like.post_id,
      comment_id: like.comment_id,
    };

    return this.httpClient
      .delete<NoDataResponse>(this.DELETE_URL, { body })
      .pipe(
        map((response: NoDataResponse) => {
          return response;
        }),
        catchError((error) => {
          // Handle the error here (e.g., show an error message)
          console.error('Error unliking post:', error);
          return throwError(error);
        })
      );
  }
}
