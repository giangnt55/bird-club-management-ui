import {
  ChangeDetectorRef,
  Component,
  Inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { DetailPost } from 'src/app/models/post.model';
import { PostService } from 'src/app/services/post.service';
import { TimeService } from 'src/app/time.service';
import { CommentService } from 'src/app/services/comment.service';
import { CommentCreate, DetailComment } from 'src/app/models/comment.model';
import { LikeService } from 'src/app/services/like.service';
import { ReplyService } from 'src/app/services/reply.service';
import { MenuDialogComponent } from 'src/app/menu-dialog/menu-dialog.component';

@Component({
  selector: 'app-post-dialog',
  templateUrl: './post-dialog.component.html',
  styleUrls: ['./post-dialog.component.css'],
})
export class PostDialogComponent implements OnInit, OnDestroy {
  post!: DetailPost;
  private subscription!: Subscription;
  postId!: string;
  loggedInAccount!: any | null;
  commentContent: string = '';
  comments: DetailComment[] = [];
  comment!: DetailComment;

  constructor(
    private postService: PostService,
    private toastr: ToastrService,
    private timeService: TimeService,
    private likeService: LikeService,
    private dialog: MatDialog,
    private replyService: ReplyService,
    private commentService: CommentService,
    private changeDetectorRef: ChangeDetectorRef,
    public dialogRef: MatDialogRef<PostDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    // Retrieve the stored account information from session storage
    const storedAccountInfo = sessionStorage.getItem('account_infor');
    if (storedAccountInfo) {
      this.loggedInAccount = JSON.parse(storedAccountInfo);
    }

    this.postId = this.data.postId;
    this.getPost();
    this.getComments();

    // Subscribe to the replyService to receive the comment
    this.subscription = this.replyService
      .getComment()
      .subscribe((comment: DetailComment | null) => {
        if (comment !== null) {
          this.comment = comment;
          this.commentContent = `@${comment.creator?.fullname}`;
          // Clear the comment after processing
          this.replyService.setcomment(null);
        }
      });
  }

  getPost() {
    this.subscription = this.postService.getPost(this.postId).subscribe(
      (response) => {
        this.post = response;
      },
      (error) => {
        this.toastr.error('An error has occurred.', 'Error');
      }
    );
  }

  getComments() {
    this.subscription = this.commentService
      .getCommentByPostId(this.postId)
      .subscribe(
        (response) => {
          this.comments = response;
        },
        (error) => {
          this.toastr.error('An error has occurred.', 'Error');
        }
      );
  }

  getTimeAgo(dateTime: Date | null | undefined): string {
    console.log(dateTime);
    if (!dateTime) {
      return '';
    }

    const formattedDate = dateTime.toISOString();
    console.log('this not null: ', this.timeService.getTimeAgo(formattedDate));
    return this.timeService.getTimeAgo(formattedDate);
  }

  getFormattedDate(dateTime: Date | null): string {
    if (!dateTime) {
      return '';
    }

    return this.timeService.formatDate(dateTime);
  }

  commentPost() {
    const comment: CommentCreate = {
      content: this.commentContent,
      post_id: this.comment == null ? this.post.id : null,
      reply_to: this.comment == null ? null : this.comment.id,
    };

    console.log(comment);

    this.commentService.comment(comment).subscribe(
      (response) => {
        // this.post.total_comment--;
        // this.post.comments
        this.getComments();
        // this.changeDetectorRef.detectChanges(); // Manually trigger change detection to update the UI
      },
      (error) => {
        // Handle the error here
        // For example, display an error message or perform error handling tasks
        console.error('Error creating comment:', error);
      }
    );

    // Clear the input field after submitting the comment
    this.commentContent = '';
  }

  openMenuDialog(): void {
    const dialogRef = this.dialog.open(MenuDialogComponent);

    dialogRef.afterClosed().subscribe((result: string | undefined) => {
      if (result === 'report') {
        // Handle report option
      } else if (result === 'cancel') {
        // Handle cancel option
      }
    });
  }
}
