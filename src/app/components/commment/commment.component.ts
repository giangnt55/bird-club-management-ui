import {
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { DetailComment } from 'src/app/models/comment.model';
import { CommentService } from 'src/app/services/comment.service';
import { LikeService } from 'src/app/services/like.service';
import { ReplyService } from 'src/app/services/reply.service';

@Component({
  selector: 'app-commment',
  templateUrl: './commment.component.html',
  styleUrls: ['./commment.component.css'],
})
export class CommmentComponent implements OnInit, OnDestroy {
  @Input() detailComment!: DetailComment;
  loggedInAccount!: any | null;
  private subscription!: Subscription;

  constructor(
    private dialog: MatDialog,
    private likeService: LikeService,
    private commentService: CommentService,
    private replyService: ReplyService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const storedAccountInfo = sessionStorage.getItem('account_infor');
    if (storedAccountInfo) {
      this.loggedInAccount = JSON.parse(storedAccountInfo);
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  likeComment() {
    if (this.detailComment.is_liked) {
      // Call the API to unlike the post
      this.subscription = this.likeService
        .unlike({ post_id: null, comment_id: this.detailComment.id })
        .subscribe(
          (response) => {
            this.detailComment.is_liked = false;
            this.detailComment.total_like--;
            this.changeDetectorRef.detectChanges();
          },
          (error) => {
            // Handle the error here
            // For example, display an error message or perform error handling tasks
            console.error('Error unliking post:', error);
          }
        );
    } else {
      this.subscription = this.likeService
        .like({ post_id: null, comment_id: this.detailComment.id })
        .subscribe(
          (response) => {
            this.detailComment.is_liked = true;
            this.detailComment.total_like++;
            this.changeDetectorRef.detectChanges();
          },
          (error) => {
            // Handle the error here
            // For example, display an error message or perform error handling tasks
            console.error('Error liking post:', error);
          }
        );
    }
  }

  onReplyClick(comment: DetailComment) {
    this.replyService.setcomment(comment);
  }
}
