import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { DetailPost } from 'src/app/models/post.model';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post-dialog',
  templateUrl: './post-dialog.component.html',
  styleUrls: ['./post-dialog.component.css'],
})
export class PostDialogComponent implements OnInit {
  post!: DetailPost;
  private subscription!: Subscription;
  postId!: string;

  constructor(
    private postService: PostService,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<PostDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.postId = this.data.postId;
    this.getPost();
  }

  getPost() {
    this.subscription = this.postService.getPost(this.postId).subscribe(
      (response) => {
        this.post = response;
      },
      (error) => {
        this.toastr.error('Error has occured:)', 'Error');
      }
    );
  }
}
