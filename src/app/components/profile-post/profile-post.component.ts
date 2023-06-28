import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PostDialogComponent } from '../post-dialog/post-dialog.component';
import { Post } from 'src/app/models/post.model';

@Component({
  selector: 'app-profile-post',
  templateUrl: './profile-post.component.html',
  styleUrls: ['./profile-post.component.css'],
})
export class ProfilePostComponent implements OnInit {
  constructor(private dialog: MatDialog) {}
  @Input() post!: Post;
  showPostDetail: boolean = false;

  ngOnInit(): void {
    // Initialization logic goes here if needed
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
}
