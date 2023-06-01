import { Component, Input } from '@angular/core';
import { Post } from 'src/app/models/post.model';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent {
  @Input() post!: Post;

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
