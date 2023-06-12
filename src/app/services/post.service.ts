import { Injectable } from '@angular/core';
import { environment } from 'src/app/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Post } from 'src/app/models/post.model';
import { PaginationResponse } from 'src/app/models/paging.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private apiUrl: string = environment.apiUrl;
  GET_POST_URL = `${this.apiUrl}/post`;

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
}
