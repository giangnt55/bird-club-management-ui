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
  postId: string = 'd53a57e9-24ec-4599-3f8f-08db6c9b23a3'; // Assign the ID from the API response

  // openPostDetail() {
  //   this.showPostDetail = !this.showPostDetail;
  //   console.log(this.postId);
  // }
  openPostDetail() {
    const postId = '3fa85f64-5717-4562-b3fc-2c963f66afa6'; // Replace with the actual postId

    const dialogRef = this.dialog.open(PostDialogComponent, {
      data: { postId },
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log('Post dialog closed');
    });
  }
}
