import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { FollowerDialogComponent } from 'src/app/components/follower-dialog/follower-dialog.component';
import { FollowingDialogComponent } from 'src/app/components/following-dialog/following-dialog.component';
import {
  FollowPaginationParam,
  Follower,
  Following,
} from 'src/app/models/follow.model';
import { Post } from 'src/app/models/post.model';
import { User } from 'src/app/models/user.model';
import { FollowService } from 'src/app/services/follow.service';
import { PostService } from 'src/app/services/post.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  followers: Follower[] = [];
  followings: Following[] = [];
  user!: User | null;
  private subscription!: Subscription;
  loggedInAccount!: any | null;
  username!: string | null;

  constructor(
    private postService: PostService,
    private usersService: UsersService,
    private followService: FollowService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private dialog: MatDialog,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // Retrieve the stored account information from session storage
    const storedAccountInfo = sessionStorage.getItem('account_infor');
    if (storedAccountInfo) {
      this.loggedInAccount = JSON.parse(storedAccountInfo);
    }

    this.subscription = this.route.params.subscribe((params) => {
      this.username = params['username'];
      this.getPostsByUsername();
      this.getUserInfor();
    });
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

  getFollowers(follow_to: any) {
    const paging: FollowPaginationParam = {
      id: null,
      create_at_from: null,
      page: 1,
      page_size: 1000,
      order_by: null,
      follow_to: follow_to,
      creator_id: null,
    };

    this.subscription = this.followService.getFollowers(paging).subscribe(
      (response) => {
        this.followers = response.data;
        this.openFollowerDialog();
      },
      (error) => {
        console.log('Error:', error);
      }
    );
  }

  getFollowings(creator_id: any) {
    const paging: FollowPaginationParam = {
      id: null,
      create_at_from: null,
      page: 1,
      page_size: 1000,
      order_by: null,
      follow_to: null,
      creator_id: creator_id,
    };

    this.subscription = this.followService.getFollowings(paging).subscribe(
      (response) => {
        this.followings = response.data;
        this.openFollowingDialog();
      },
      (error) => {
        console.log('Error:', error);
      }
    );
  }

  openFollowerDialog() {
    const dialogRef = this.dialog.open(FollowerDialogComponent, {
      data: {
        followers: this.followers,
      },
    });

    dialogRef.afterClosed().subscribe((result: string | undefined) => {
      if (result === 'report') {
        // Handle report option
      } else if (result === 'cancel') {
        // Handle cancel option
      }
    });
  }

  openFollowingDialog() {
    const dialogRef = this.dialog.open(FollowingDialogComponent, {
      data: {
        followings: this.followings,
      },
    });

    dialogRef.afterClosed().subscribe((result: string | undefined) => {});
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
