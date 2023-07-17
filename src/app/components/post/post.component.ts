import {
  Component,
  Input,
  OnInit,
  OnDestroy,
  ChangeDetectorRef,
} from '@angular/core';
import { Post } from 'src/app/models/post.model';
import { PostDialogComponent } from '../post-dialog/post-dialog.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { CommentService } from 'src/app/services/comment.service';
import { CommentCreate } from 'src/app/models/comment.model';
import { LikeService } from 'src/app/services/like.service';
import { MenuDialogComponent } from 'src/app/menu-dialog/menu-dialog.component';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit, OnDestroy {
  showFullText: boolean = false;
  showPostDetail: boolean = false;
  private subscription!: Subscription;
  private likeSubscription: Subscription | undefined;
  commentContent: string = '';
  loggedInAccount!: any | null;

  @Input() post!: Post;

  constructor(
    private dialog: MatDialog,
    private likeService: LikeService,
    private commentService: CommentService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // Retrieve the stored account information from session storage
    const storedAccountInfo = sessionStorage.getItem('account_infor');
    if (storedAccountInfo) {
      this.loggedInAccount = JSON.parse(storedAccountInfo);
    }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    if (this.likeSubscription) {
      this.likeSubscription.unsubscribe();
    }
  }

  likePost() {
    if (this.post.is_liked) {
      // Call the API to unlike the post
      this.likeSubscription = this.likeService
        .unlike({ post_id: this.post.id, comment_id: null })
        .subscribe(
          (response) => {
            // Handle the success response here
            // For example, display a success message or update the post's like count
            this.post.is_liked = false; // Update the post's like status
            this.post.total_like--; // Increment the post's like count
            this.changeDetectorRef.detectChanges(); // Manually trigger change detection to update the UI
          },
          (error) => {
            // Handle the error here
            // For example, display an error message or perform error handling tasks
            console.error('Error unliking post:', error);
          }
        );
    } else {
      // Call the API to like the post
      this.likeSubscription = this.likeService
        .like({ post_id: this.post.id, comment_id: null })
        .subscribe(
          (response) => {
            // Handle the success response here
            // For example, display a success message or update the post's like count
            this.post.is_liked = true; // Update the post's like status
            this.post.total_like++; // Increment the post's like count
            this.changeDetectorRef.detectChanges(); // Manually trigger change detection to update the UI
          },
          (error) => {
            // Handle the error here
            // For example, display an error message or perform error handling tasks
            console.error('Error liking post:', error);
          }
        );
    }
  }

  sharePost() {
    // Implement the logic for sharing a post
    console.log('Post Shared');
  }

  commentPost() {
    const comment: CommentCreate = {
      content: this.commentContent,
      post_id: this.post.id,
      reply_to: null,
    };

    this.commentService.comment(comment).subscribe(
      (response) => {
        this.post.total_comment++;
        this.changeDetectorRef.detectChanges(); // Manually trigger change detection to update the UI
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

  openPostDetail() {
    const postIdParam = this.post.id;

    const dialogRef = this.dialog.open(PostDialogComponent, {
      data: { postId: postIdParam },
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log('Post dialog closed');
    });
  }

  openMenuDialog(): void {
    const dialogConfig: MatDialogConfig = {
      data: { targetId: this.post.id },
    };

    if (this.post.creator?.id === this.loggedInAccount.id) {
      const dialogRef = this.dialog.open(DeleteDialogComponent, dialogConfig);
    } else {
      const dialogRef = this.dialog.open(MenuDialogComponent, dialogConfig);
    }
  }

  convertToTimeZone7Plus(date: Date | null | undefined) {
    if (!date) {
      return null;
    }
    const originalDate = new Date(date);
    originalDate.setHours(originalDate.getHours() + 7);

    // // Adjust the converted date to the desired format
    // const formattedDate = originalDate.toLocaleString('en-US');

    return originalDate;
  }
}
