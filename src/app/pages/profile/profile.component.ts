import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/models/post.model';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  posts: Post[] = [];
  private subscription!: Subscription;
  loggedInAccount!: any | null;

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    // Retrieve the stored account information from session storage
    const storedAccountInfo = sessionStorage.getItem('account_infor');
    if (storedAccountInfo) {
      this.loggedInAccount = JSON.parse(storedAccountInfo);
    }

    this.getOwnPosts();
  }

  getOwnPosts() {
    this.subscription = this.postService.getOwnPosts().subscribe(
      (response) => {
        this.posts = response;
      },
      (error) => {
        console.log('Error:', error);
      }
    );
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
