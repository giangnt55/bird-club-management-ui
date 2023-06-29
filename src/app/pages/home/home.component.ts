import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Subscription } from 'rxjs';
import { BasePaginationParam } from 'src/app/models/paging.model';
import { Post } from 'src/app/models/post.model';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  private subscription!: Subscription;
  private currentPage: number = 1;
  isLoading: boolean = false;

  constructor(private postService: PostService) {}

  ngOnInit() {
    this.getPosts();
  }

  getPosts() {
    const paging: BasePaginationParam = {
      id: null,
      create_at_from: null,
      page: this.currentPage,
      page_size: 5,
      order_by: null,
    };

    this.isLoading = true; // Set isLoading to true before making the API call

    this.subscription = this.postService.getPosts(paging).subscribe(
      (response) => {
        const newPosts = response.data;
        this.posts = [...this.posts, ...newPosts]; // Append new posts to the existing array
        this.isLoading = false; // Set isLoading to false when the API call is successful
      },
      (error) => {
        console.log('Error:', error);
        this.isLoading = false; // Set isLoading to false when the API call fails
      }
    );
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  loadMorePosts() {
    this.currentPage++;
    this.getPosts();
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event: Event) {
    // Check if the scroll position is near the fourth post
    const scrollPosition = window.innerHeight + window.scrollY;
    const fourthPostElement = document.getElementById(
      `post-${4 * this.currentPage}`
    );
    const fourthPostOffset = fourthPostElement?.offsetTop;

    if (fourthPostOffset && scrollPosition >= fourthPostOffset) {
      // Load more posts
      this.loadMorePosts();
    }
  }
}
