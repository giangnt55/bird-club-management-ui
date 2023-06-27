import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DetailComment } from '../models/comment.model';

@Injectable({
  providedIn: 'root',
})
export class ReplyService {
  private commentSubject: BehaviorSubject<DetailComment | null> =
    new BehaviorSubject<DetailComment | null>(null);

  setcomment(comment: DetailComment | null) {
    this.commentSubject.next(comment);
  }

  getComment(): BehaviorSubject<DetailComment | null> {
    return this.commentSubject;
  }
}
