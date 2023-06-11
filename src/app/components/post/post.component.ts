import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Post } from 'src/app/models/post.model';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit, OnDestroy {
  @Input() post!: Post;

  ngOnInit(): void {
    console.log(this.post);
  }
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

  likePost() {
    // Implement the logic for liking a post
    console.log('Post Liked');
  }

  sharePost() {
    // Implement the logic for sharing a post
    console.log('Post Shared');
  }

  commentPost() {
    // Implement the logic for commenting on a post
    console.log('Post Commented');
  }
}
