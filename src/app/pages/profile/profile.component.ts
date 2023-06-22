import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PostDetailComponent } from 'src/app/components/post-detail/post-detail.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  constructor(private router: Router, private dialog: MatDialog) {}

  redirectToUpdateProfile(){
    this.router.navigate(['/update-profile']);
  }

  showPostDetails() {
    const dialogRef = this.dialog.open(PostDetailComponent, {
      width: '400px',
      data: {
        title: 'Post Title',
        likes: 465,
        comments: 25,
         image: "https://images.unsplash.com/photo-1559056986-f834be7896e5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1955&q=80"
        // Add any other necessary data for the post details
      }
    });
  }

}
