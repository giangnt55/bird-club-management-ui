import { Injectable } from '@angular/core';
import { environment } from 'src/app/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Like } from '../models/like.model';
import { Response } from '../models/response.model';


@Injectable({
  providedIn: 'root',
})

export class LikeService{
  private apiUrl: string = environment.apiUrl;
  LIKE_URL = `${this.apiUrl}/like`;

  constructor(private httpClient: HttpClient, private toastr: ToastrService) {}

  likePost(id: string): Observable<Response<any>> {

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { postId: id };

    return this.httpClient.post<Response<any>>(this.LIKE_URL, body, { headers: headers });
    //return this.httpClient.post<Like>(this.LIKE_URL, {});
  }
}
