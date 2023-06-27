import {
  ChangeDetectorRef,
  Component,
  Inject,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { DetailPost } from 'src/app/models/post.model';
import { PostService } from 'src/app/services/post.service';
import { TimeService } from 'src/app/time.service';
import { LikeService } from '../like.service';
import { CommentService } from 'src/app/services/comment.service';
import { CommentCreate } from 'src/app/models/comment.model';

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

  constructor(
    private postService: PostService,
    private toastr: ToastrService,
    private timeService: TimeService,
    private likeService: LikeService,
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
      post_id: this.post.id,
      reply_to: null,
    };

    this.commentService.comment(comment).subscribe(
      (response) => {
        // this.post.total_comment--;
        // this.post.comments
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
}
