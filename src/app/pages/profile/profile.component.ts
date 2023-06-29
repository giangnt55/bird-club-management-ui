import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/models/post.model';
import { User } from 'src/app/models/user.model';
import { PostService } from 'src/app/services/post.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  posts: Post[] = [];
  user!: User | null;
  private subscription!: Subscription;
  loggedInAccount!: any | null;
  username!: string | null;

  constructor(
    private postService: PostService,
    private usersService: UsersService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Retrieve the stored account information from session storage
    const storedAccountInfo = sessionStorage.getItem('account_infor');
    if (storedAccountInfo) {
      this.loggedInAccount = JSON.parse(storedAccountInfo);
    }

    this.username = this.route.snapshot.paramMap.get('username');

    this.getPostsByUsername();
    this.getUserInfor();
  }

  getPostsByUsername() {
    if (this.username) {
      this.subscription = this.postService
        .getPostsByUsername(this.username)
        .subscribe(
          (response) => {
            this.posts = response;
          },
          (error) => {
            console.log('Error:', error);
          }
        );
    } else {
      console.log('Username is null');
    }
  }

  getUserInfor() {
    if (this.username) {
      this.subscription = this.usersService
        .getUserInfor(this.username)
        .subscribe(
          (response) => {
            this.user = response.data;
          },
          (error) => {
            console.log('Error:', error);
          }
        );
    } else {
      console.log('Username is null');
    }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
