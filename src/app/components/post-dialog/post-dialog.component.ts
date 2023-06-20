import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
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
  @Input() postId!: string;

  constructor(
    private postService: PostService,
    public dialogRef: MatDialogRef<PostDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    console.log('OK ' + this.postId);
    this.getPost();
  }

  getPost() {
    this.subscription = this.postService.getPost(this.postId).subscribe(
      (response) => {
        this.post = response;
        console.log(this.post);
      },
      (error) => {
        console.log('Error:', error);
      }
    );
  }
}
