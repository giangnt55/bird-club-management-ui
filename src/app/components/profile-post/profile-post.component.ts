import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PostDialogComponent } from '../post-dialog/post-dialog.component';

@Component({
  selector: 'app-profile-post',
  templateUrl: './profile-post.component.html',
  styleUrls: ['./profile-post.component.css'],
})
export class ProfilePostComponent implements OnInit {
  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  showPostDetail: boolean = false;
  postId: string = '6e9fd5bb-e2a0-4e97-3f90-08db6c9b23a3'; // Hardcode for testing

  openPostDetail() {
    const postIdParam = this.postId;

    const dialogRef = this.dialog.open(PostDialogComponent, {
      data: { postId: postIdParam },
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log('Post dialog closed');
    });
  }
}
